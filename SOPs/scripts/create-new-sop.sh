#!/bin/bash

# Script to create a new SOP with proper naming convention
# Usage: ./create-new-sop.sh

echo "==================================="
echo "DuetRight SOP Creation Helper"
echo "==================================="

# Define domain codes
DOMAINS=("OPS" "FIN" "HR" "MKT" "BATH" "KIT" "FP" "GR" "QA" "IT")

# Select domain
echo "Select Domain Code:"
select domain in "${DOMAINS[@]}"; do
    if [[ -n "$domain" ]]; then
        echo "Selected: $domain"
        break
    else
        echo "Invalid selection. Please try again."
    fi
done

# Get short descriptor
while true; do
    read -p "Enter ShortDescriptor (CamelCase, max 3 words, no spaces): " descriptor
    # Basic validation - starts with capital, no spaces, alphanumeric
    if [[ "$descriptor" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        break
    else
        echo "Invalid format. Must be CamelCase with no spaces (e.g., ProjectKickoff)"
    fi
done

# Version (new SOPs start at 1.0)
version="1.0"

# Get current date
date=$(date +%Y%m%d)

# Check if it's a draft
read -p "Is this a DRAFT? (y/n): " is_draft
if [[ "$is_draft" == "y" || "$is_draft" == "Y" ]]; then
    draft_suffix="-DRAFT"
else
    draft_suffix=""
fi

# Construct filename
filename="DR-SOP-${domain}-${descriptor}-v${version}-${date}${draft_suffix}.md"
filepath="SOPs/${domain}/${filename}"

# Create directory if it doesn't exist
mkdir -p "SOPs/${domain}"

# Create SOP template
cat > "$filepath" << EOF
# ${filename%.*}

## Standard Operating Procedure

### Title
[Enter full title here]

### Purpose
[Describe the purpose of this SOP]

### Scope
[Define what this SOP covers and any limitations]

### Definitions
- **[Term]**: [Definition]
- **[Term]**: [Definition]

### Responsibilities
- **[Role]**: [Responsibilities]
- **[Role]**: [Responsibilities]

### Procedure

#### 1. [Step Name]
[Detailed description of step 1]

#### 2. [Step Name]
[Detailed description of step 2]

#### 3. [Step Name]
[Detailed description of step 3]

### Documentation
- [List any forms, logs, or records to be maintained]

### References
- [List any related SOPs, regulations, or resources]

### Revision History
| Version | Date | Author | Description |
|---------|------|--------|-------------|
| v1.0 | ${date} | [Your Name] | Initial creation |

---
*End of Document*
EOF

echo ""
echo "✅ SOP created successfully!"
echo "📄 File: $filepath"
echo ""
echo "Next steps:"
echo "1. Edit the file to add your content"
echo "2. Remove -DRAFT suffix when approved"
echo "3. Update the Master SOP Index"
echo "4. Commit and push to repository"