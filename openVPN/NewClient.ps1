#Requires -RunAsAdministrator
#Config
$Port = 1194
$OpenVPNPath = "C:\Program Files\OpenVPN"
$EasyRSAPath = $OpenVPNPath + "\easy-rsa"
$externalIP = Invoke-WebRequest ifconfig.me/ip

#Check args
if($args.count -eq 0){
    Write-Host "Pass client names !"
    return
}

#Test path
if (-not(Test-Path -Path "$EasyRSAPath\EasyRSA-Start.bat" -PathType Leaf)){
    Write-Host "EasyRSA path error. Check config inside scipt";
    return
}

$pki = $EasyRSAPath + "\pki\ca.crt"
$OldLocation = Get-Location
Set-Location -Path $EasyRSAPath
for ( $i = 0; $i -lt $args.count; $i++ ) {
    $ClientName = $args[$i]

    #Create cert/key
    "./easyrsa build-client-full " + $ClientName + " nopass`nyes"  | .\EasyRSA-Start.bat  2>&1 | out-null;

    #Uniform file things
    $issued = $EasyRSAPath + "\pki\issued\$ClientName.crt"
    $private = $EasyRSAPath + "\pki\private\$ClientName.key"
    $clientUniform = $OpenVPNPath + "\config\$ClientName.ovpn"


    "<ca>" | Set-Content $clientUniform
    Get-Content $pki | Add-Content $clientUniform
    "</ca>" | Add-Content $clientUniform

    "<key>" | Add-Content $clientUniform
    Get-Content $private | Add-Content $clientUniform
    "</key>" | Add-Content $clientUniform

    "<cert>" | Add-Content $clientUniform
    $cert = Get-Content  $issued -Encoding UTF8 -Raw
    $Regex = [Regex]::new("(?<=-----BEGIN CERTIFICATE-----(.|\n|\r)(.|\n|\r))(.|\n|\r)*(?=(.|\n|\r))")
    $Match = $Regex.Match($cert)
    $Match = "-----BEGIN CERTIFICATE-----`n" + $Match.Value
    $Match | Add-Content $clientUniform      
    "</cert>" | Add-Content $clientUniform

    $Conf = "client
    dev tun
    proto udp4
    remote $externalIP $Port
    resolv-retry infinite
    nobind
    persist-key
    persist-tun
    verb 4"
    $Conf | Add-Content $clientUniform
    Write-Host "$ClientName CREATED !"
}
Set-Location -Path $OldLocation
