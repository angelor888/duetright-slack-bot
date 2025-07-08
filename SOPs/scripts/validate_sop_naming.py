#!/usr/bin/env python3
"""
Validate SOP file naming convention for DuetRight
Format: DR-SOP-<DomainCode>-<ShortDescriptor>-v<Major.Minor>-<YYYYMMDD>[-DRAFT].md
"""

import os
import re
import sys
from datetime import datetime
from pathlib import Path

# Approved domain codes
DOMAIN_CODES = {
    'OPS', 'FIN', 'HR', 'MKT', 'BATH', 
    'KIT', 'FP', 'GR', 'QA', 'IT'
}

# Regex pattern for SOP naming convention
SOP_PATTERN = re.compile(
    r'^DR-SOP-([A-Z]{2,5})-([A-Z][a-zA-Z]+(?:[A-Z][a-zA-Z]+)*)-v(\d+)\.(\d+)-(\d{8})(-DRAFT)?\.md$'
)

def validate_date(date_str):
    """Validate date format YYYYMMDD"""
    try:
        datetime.strptime(date_str, '%Y%m%d')
        return True
    except ValueError:
        return False

def validate_sop_file(filepath):
    """Validate a single SOP file name"""
    filename = os.path.basename(filepath)
    errors = []
    
    # Skip README files
    if filename == 'README.md':
        return []
    
    match = SOP_PATTERN.match(filename)
    
    if not match:
        errors.append(f"❌ {filename}: Does not match naming convention")
        errors.append("   Expected: DR-SOP-<DomainCode>-<ShortDescriptor>-v<Major.Minor>-<YYYYMMDD>[-DRAFT].md")
        return errors
    
    domain_code = match.group(1)
    short_descriptor = match.group(2)
    major_version = match.group(3)
    minor_version = match.group(4)
    date_str = match.group(5)
    draft_suffix = match.group(6)
    
    # Validate domain code
    if domain_code not in DOMAIN_CODES:
        errors.append(f"❌ {filename}: Invalid domain code '{domain_code}'")
        errors.append(f"   Valid codes: {', '.join(sorted(DOMAIN_CODES))}")
    
    # Validate short descriptor (should be CamelCase, max 3 words)
    words = re.findall(r'[A-Z][a-z]*', short_descriptor)
    if len(words) > 3:
        errors.append(f"❌ {filename}: ShortDescriptor has {len(words)} words (max 3)")
    
    # Validate version numbers
    if major_version == '0' and minor_version == '0':
        errors.append(f"❌ {filename}: Version cannot be v0.0")
    
    # Validate date
    if not validate_date(date_str):
        errors.append(f"❌ {filename}: Invalid date format '{date_str}'")
    
    # Check file location matches domain code
    file_dir = os.path.basename(os.path.dirname(filepath))
    if file_dir != domain_code:
        errors.append(f"❌ {filename}: File in wrong directory. Should be in SOPs/{domain_code}/")
    
    if not errors:
        print(f"✅ {filename}: Valid")
    
    return errors

def main():
    """Main validation function"""
    sop_dir = Path('SOPs')
    all_errors = []
    
    if not sop_dir.exists():
        print("❌ SOPs directory not found")
        sys.exit(1)
    
    # Find all .md files in SOPs directory
    sop_files = list(sop_dir.rglob('*.md'))
    
    if not sop_files:
        print("⚠️  No SOP files found")
        return
    
    print(f"Validating {len(sop_files)} SOP file(s)...\n")
    
    for sop_file in sop_files:
        errors = validate_sop_file(str(sop_file))
        all_errors.extend(errors)
    
    if all_errors:
        print("\n❌ Validation failed with the following errors:\n")
        for error in all_errors:
            print(error)
        sys.exit(1)
    else:
        print("\n✅ All SOP files passed validation!")

if __name__ == "__main__":
    main()