# PowerShell script to copy images from root images folder to public/images folder

$sourceFolder = "images"
$destinationFolder = "public\images"

if (Test-Path $sourceFolder) {
    Write-Host "Copying images from $sourceFolder to $destinationFolder..." -ForegroundColor Green
    
    # Create destination folder if it doesn't exist
    if (-not (Test-Path $destinationFolder)) {
        New-Item -ItemType Directory -Path $destinationFolder -Force | Out-Null
    }
    
    # Copy all image files
    $imageFiles = Get-ChildItem -Path $sourceFolder -Include *.jpg,*.jpeg,*.png,*.gif -Recurse
    
    foreach ($file in $imageFiles) {
        $destinationPath = Join-Path $destinationFolder $file.Name
        Copy-Item -Path $file.FullName -Destination $destinationPath -Force
        Write-Host "Copied: $($file.Name)" -ForegroundColor Yellow
    }
    
    Write-Host "`nAll images copied successfully!" -ForegroundColor Green
    Write-Host "Total files copied: $($imageFiles.Count)" -ForegroundColor Cyan
} else {
    Write-Host "Source folder '$sourceFolder' not found!" -ForegroundColor Red
    Write-Host "Please ensure the images folder exists in the project root." -ForegroundColor Yellow
}

