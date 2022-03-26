if (-not(Test-Path .\file.txt)){
	Write-Host "file.txt does not exist here!"
} else {
	Write-Host "file.txt exists here!"
}