#!/usr/bin/env python3
import csv
import json
import re
import hashlib
from collections import defaultdict, Counter
from typing import Dict, List, Any
import unicodedata

class ClaimsProcessor:
    def __init__(self):
        self.claims_data = []
        self.stats = {
            'total_claims': 0,
            'claim_types': Counter(),
            'courts': Counter(),
            'plaintiff_types': Counter(),
            'defendant_types': Counter(),
            'amount_ranges': {
                '0-5000': 0,
                '5000-15000': 0,
                '15000-50000': 0,
                '50000+': 0
            }
        }
        
        # Common claim types in Hebrew
        self.claim_types_hebrew = {
            'ספק - לקוח': 'ספק-לקוח',
            'ספק-לקוח': 'ספק-לקוח', 
            'רכב': 'רכב',
            'שכנים': 'שכנים',
            'ביטוח': 'ביטוח',
            'ספאם': 'ספאם',
            'שכירות': 'שכירות',
            'דיור': 'דיור',
            'מקרקעין': 'מקרקעין',
            'חוזה': 'חוזה',
            'עבודה': 'עבודה',
            'שירותים': 'שירותים'
        }
        
    def anonymize_text(self, text: str) -> str:
        """Remove PII from text while keeping the legal context"""
        if not text:
            return text
            
        # Remove phone numbers
        text = re.sub(r'\b0\d{1,2}-?\d{7}\b|\b0\d{9}\b', '[טלפון]', text)
        
        # Remove emails
        text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[אימייל]', text)
        
        # Remove ID numbers (Israeli format)
        text = re.sub(r'\b\d{9}\b', '[מספר זהות]', text)
        
        # Remove addresses (Hebrew pattern)
        address_patterns = [
            r'רחוב .+? \d+',
            r'דירה .+?\b',
            r'מיקוד \d+',
            r'ת\.ד\. \d+',
        ]
        for pattern in address_patterns:
            text = re.sub(pattern, '[כתובת]', text)
        
        # Remove names (keep only first letter + family name indicator)
        text = re.sub(r'\b[א-ת]{2,}\s+[א-ת]{2,}(?:\s+[א-ת]{2,})?\b', '[שם]', text)
        
        return text
        
    def extract_claim_info(self, text: str) -> Dict[str, Any]:
        """Extract structured information from claim text"""
        info = {
            'claim_type': '',
            'amount': 0,
            'court': '',
            'plaintiff_type': 'individual',
            'defendant_type': 'individual',
            'description': '',
            'incident_location': '',
            'incident_date': ''
        }
        
        # Extract claim type
        match = re.search(r'סוג תביעה \| (.+)', text)
        if match:
            claim_type_raw = match.group(1).strip()
            info['claim_type'] = self.claim_types_hebrew.get(claim_type_raw, claim_type_raw)
        
        # Extract amount
        amount_match = re.search(r'סכום התביעה \| (\d+)', text)
        if amount_match:
            info['amount'] = int(amount_match.group(1))
        
        # Extract court
        court_match = re.search(r'בחר בית משפט \| (.+)', text)
        if court_match:
            info['court'] = court_match.group(1).strip()
        elif 'בחר בית משפט:' in text:
            court_match = re.search(r'בחר בית משפט: (.+)', text)
            if court_match:
                info['court'] = court_match.group(1).strip()
        
        # Extract incident location
        location_match = re.search(r'מקום האירוע \| (.+)', text)
        if location_match:
            info['incident_location'] = location_match.group(1).strip()
            
        # Extract incident date
        date_match = re.search(r'תאריך האירוע \| (.+)', text)
        if date_match:
            info['incident_date'] = date_match.group(1).strip()
        
        # Extract description
        desc_match = re.search(r'תיאור האירוע \| (.+?)(?=תיאור הנזק|\n\n|$)', text, re.DOTALL)
        if desc_match:
            description = desc_match.group(1).strip()
            info['description'] = self.anonymize_text(description)
        
        # Determine defendant type from text
        if any(term in text for term in ['ח.פ.', 'שם חברה', 'עוסק מורשה']):
            if re.search(r'שם חברה \| .+', text) and not re.search(r'שם חברה \| *$', text):
                info['defendant_type'] = 'company'
            elif re.search(r'עוסק מורשה \| .+', text) and not re.search(r'עוסק מורשה \| *$', text):
                info['defendant_type'] = 'business'
            else:
                info['defendant_type'] = 'individual'
        
        return info
    
    def categorize_amount(self, amount: int) -> str:
        """Categorize claim amount into ranges"""
        if amount < 5000:
            return '0-5000'
        elif amount < 15000:
            return '5000-15000' 
        elif amount < 50000:
            return '15000-50000'
        else:
            return '50000+'
    
    def process_csv(self, filepath: str):
        """Process the CSV file and extract all claims data"""
        print(f"Processing CSV file: {filepath}")
        
        with open(filepath, 'r', encoding='utf-8') as file:
            csv_reader = csv.reader(file)
            rows = list(csv_reader)
            
        print(f"Found {len(rows)} total rows")
        
        # Skip header if present
        data_rows = rows[1:] if rows[0][0] == 'Date' else rows
        
        for i, row in enumerate(data_rows):
            if len(row) >= 4 and row[3]:  # Column D (Text) exists and has content
                try:
                    claim_info = self.extract_claim_info(row[3])
                    
                    if claim_info['claim_type'] or claim_info['amount'] > 0:  # Valid claim
                        self.claims_data.append(claim_info)
                        
                        # Update statistics
                        self.stats['total_claims'] += 1
                        if claim_info['claim_type']:
                            self.stats['claim_types'][claim_info['claim_type']] += 1
                        if claim_info['court']:
                            self.stats['courts'][claim_info['court']] += 1
                        if claim_info['plaintiff_type']:
                            self.stats['plaintiff_types'][claim_info['plaintiff_type']] += 1
                        if claim_info['defendant_type']:
                            self.stats['defendant_types'][claim_info['defendant_type']] += 1
                        if claim_info['amount'] > 0:
                            amount_range = self.categorize_amount(claim_info['amount'])
                            self.stats['amount_ranges'][amount_range] += 1
                            
                except Exception as e:
                    print(f"Error processing row {i+1}: {e}")
                    continue
                    
        print(f"Successfully processed {self.stats['total_claims']} claims")
    
    def generate_conversation_examples(self) -> List[str]:
        """Generate anonymized conversation examples from the best descriptions"""
        examples = []
        
        # Group by claim type to ensure variety
        by_type = defaultdict(list)
        for claim in self.claims_data:
            if claim['description'] and len(claim['description']) > 50:
                by_type[claim['claim_type']].append(claim['description'])
        
        # Take top examples from each type
        for claim_type, descriptions in by_type.items():
            sorted_desc = sorted(descriptions, key=len, reverse=True)[:3]
            examples.extend(sorted_desc[:3])
            if len(examples) >= 15:
                break
                
        return examples[:15]
    
    def generate_field_patterns(self) -> Dict[str, List[str]]:
        """Generate common patterns for each claim type"""
        patterns = defaultdict(list)
        
        for claim in self.claims_data:
            if claim['claim_type'] and claim['description']:
                # Extract common phrases/patterns
                words = claim['description'].split()
                if len(words) > 5:
                    pattern = ' '.join(words[:10]) + '...'
                    patterns[claim['claim_type']].append(pattern)
        
        # Keep only top patterns per type
        for claim_type in patterns:
            patterns[claim_type] = list(set(patterns[claim_type]))[:5]
            
        return dict(patterns)
    
    def generate_knowledge_base(self) -> Dict[str, Any]:
        """Generate the complete knowledge base"""
        
        # Calculate typical amount ranges for each claim type
        claim_type_details = {}
        for claim_type, count in self.stats['claim_types'].items():
            amounts = [c['amount'] for c in self.claims_data 
                      if c['claim_type'] == claim_type and c['amount'] > 0]
            if amounts:
                claim_type_details[claim_type] = {
                    'count': count,
                    'min_amount': min(amounts),
                    'max_amount': max(amounts),
                    'avg_amount': int(sum(amounts) / len(amounts)),
                    'common_patterns': []
                }
            else:
                claim_type_details[claim_type] = {
                    'count': count,
                    'min_amount': 0,
                    'max_amount': 0, 
                    'avg_amount': 0,
                    'common_patterns': []
                }
        
        return {
            'stats': {
                'total_claims': self.stats['total_claims'],
                'claim_type_distribution': dict(self.stats['claim_types']),
                'court_distribution': dict(self.stats['courts']),
                'defendant_type_distribution': dict(self.stats['defendant_types']),
                'amount_ranges': self.stats['amount_ranges']
            },
            'claim_types': claim_type_details,
            'conversation_examples': self.generate_conversation_examples(),
            'field_patterns': self.generate_field_patterns()
        }

def main():
    processor = ClaimsProcessor()
    
    # Process the CSV file
    processor.process_csv('/home/clawdbot/clawd/tagishli-app/data/claims-raw.csv')
    
    # Generate knowledge base
    kb = processor.generate_knowledge_base()
    
    # Save JSON knowledge base
    json_path = '/home/clawdbot/clawd/tagishli-app/data/claims-kb.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(kb, f, ensure_ascii=False, indent=2)
    
    print(f"Knowledge base saved to: {json_path}")
    print(f"Total claims processed: {kb['stats']['total_claims']}")
    print(f"Claim types found: {list(kb['stats']['claim_type_distribution'].keys())}")

if __name__ == "__main__":
    main()