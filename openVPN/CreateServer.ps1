#Requires -RunAsAdministrator
#Config data
$Port = 1194
$VPNSubnetIP = "10.50.8.0"
$VPNSubnetMask ="255.255.255.0"
$OpenVPNPath = "C:\Program Files\OpenVPN"
$EasyRSAPath = $OpenVPNPath + "\easy-rsa"
$CommonName = "IO"

#Test path
if (-not(Test-Path -Path "$EasyRSAPath\EasyRSA-Start.bat" -PathType Leaf)){
    Write-Host "EasyRSA path error. Check config inside script";
    return
}

#Confirm
$confirmation = Read-Host "This action Will Override Your Keys In pki Folder 
('y' to continue)
"
if ($confirmation -ne 'y') {
    return
}

$OldLocation = Get-Location
Set-Location -Path $EasyRSAPath

#Creating things
Write-Host "Initialize pki"
"./easyrsa init-pki`nyes`n"  | cmd /c EasyRSA-Start.bat 2>&1 | out-null;

Write-Host "Build ca"
"./easyrsa build-ca nopass`n" + $CommonName | .\EasyRSA-Start.bat 2>&1 | out-null;

Write-Host "Build server full"
"./easyrsa build-server-full server nopass`nyes"  | .\EasyRSA-Start.bat 2>&1 | out-null;

Write-Host "Generate dh"
"./easyrsa gen-dh`nyes"  | .\EasyRSA-Start.bat 2>&1 | out-null;

$configAuto = $OpenVPNPath + "\config-auto"
$pki = $EasyRSAPath + "\pki"
$issued = $EasyRSAPath + "\pki\issued\server.crt"
$private = $EasyRSAPath + "\pki\private\server.key"

#Moving things
Copy-Item -Force ("$pki\ca.crt") $configAuto
Copy-Item -Force ("$pki\dh.pem") $configAuto
Copy-Item -Force $issued $configAuto
Copy-Item -Force $private $configAuto
Write-Host "Files copied"

#Server config thingy
$serverConfig = $configAuto + "\server.ovpn"
$Conf = "port $Port
windows-driver wintun
proto udp4
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
server $VPNSubnetIP $VPNSubnetMask
ifconfig-pool-persist ipp.txt
keepalive 10 120
persist-key
persist-tun
duplicate-cn
status openvpn-status.log
verb 4"
$Conf | Set-Content $serverConfig
Write-Host "Config written"

#Firewall
netsh advfirewall firewall delete rule name="OpenVPN" | out-null
netsh advfirewall firewall add rule name="OpenVPN" dir=in localport=$Port remoteport=0-65535 protocol=UDP action=allow remoteip=any localip=any | out-null
Write-Host "Firewall rule added"

#Restart service
Write-Host "Restarting service"
net stop openvpnservice 2>&1 | out-null
net start openvpnservice | out-null
Set-Location -Path $OldLocation
Write-Host "Done !!!"
