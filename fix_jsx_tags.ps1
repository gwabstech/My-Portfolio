# Read the file
$content = Get-Content -Path "c:\projects\My-Portfolio\index.html" -Raw -Encoding UTF8

# Fix malformed JSX tags
# Pattern 1: Fix closing tags with spaces like </div >
$content = $content -replace '<\s*/\s*(\w+)\s+>', '</$1>'

# Pattern 2: Fix opening tags with spaces like < div className = "..." >
$content = $content -replace '<\s+(\w+)\s+className\s*=\s*"([^"]+)"\s*>', '<$1 className="$2">'

# Pattern 3: Fix comments with trailing spaces like {/* ... */ }
$content = $content -replace '\{\s*/\*\s*([^*]+)\s*\*/\s*\}', '{/* $1 */}'

# Write the fixed content back
$content | Set-Content -Path "c:\projects\My-Portfolio\index.html" -Encoding UTF8 -NoNewline

Write-Host "Fixed all malformed JSX tags!"
