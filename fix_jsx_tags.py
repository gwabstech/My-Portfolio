import re

# Read the file
with open(r'c:\projects\My-Portfolio\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix malformed JSX tags
# Pattern 1: Fix closing tags with spaces like </div >
content = re.sub(r'<\s*/\s*(\w+)\s+>', r'</\1>', content)

# Pattern 2: Fix opening tags with spaces like < div className = "..." >
content = re.sub(r'<\s+(\w+)\s+className\s*=\s*"([^"]+)"\s*>', r'<\1 className="\2">', content)

# Pattern 3: Fix comments with trailing spaces like {/* ... */ }
content = re.sub(r'\{\s*/\*\s*([^*]+)\s*\*/\s*\}', r'{/* \1 */}', content)

# Write the fixed content back
with open(r'c:\projects\My-Portfolio\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all malformed JSX tags!")
