const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDSL4csmMRakYAULwDGxyWPyuwC0V1mNL2IigwSSklRw3z8HE89
ORdEehgm33pUlNP3sSRRKTU/n41mJXiDn9nlIkELLaAqz9h2uhdHswNGgj8zH01l
soMd3avzytvs682s1pTWmB/OiwUb+6PMx5did0MEweo6ZQJQLh1m6P5GwQIDAQAB
AoGBAIkGTSSIz3GP66S848+zIsy0aNqJbU9lUK7D+Iyv+06fmEqvlgT+xClzQ22M
Qa8Ee4+930Q+DiXVOZR/FysQOjcUOKZmRx5ECv3T6sxaTkE/yRLq5KqwMguHCr45
YbyYp2QufHNN0jL2pfVN3yQXsFRNpKLNbHyPgIkZIWWeU0cBAkEA/mxr3V+nuElF
KeON8jlsymeL/Mdc9fcSMyzgwjxSgDwrrB+zfBKFoNoJ+c6eepMZHtn+t5ZT1kSO
HYXKy7nzsQJBANN87zoGeOAB/EXPXHdLmYic71ejL9DfdATQtg1Txum7Yd2JdOVo
2llK8/osK47AFnmeAaj0AHdayauglkk0mBECQQDr/7hCXTNfXx+3zmthz2CZk1kn
ven+AhOwwqUtpvTEHIxKGhHMOgYYAYiVXtJkUsRPeNishNX5gBfvTKajOTbRAkBo
QgrdHBuyssfe0l7PIKHLyzHijjwgSEg1p35YC5jf2NRiFkVeYtZhdqXYCrZeZSuv
QMmotMEWFdedmEj+RcNBAkEAwZOjvS87oJlRSQ/TJrDXeZU03uLqrbtDot3sDBVY
nLg1WuZg74DllbRR50KAidIZEsRQu0OaiDmkCiPjFSPTrw==
-----END RSA PRIVATE KEY-----
`;

const publicKey = `-----BEGIN CERTIFICATE-----
MIICgDCCAekCFBsBNjCw9UO0e6B7VadNfvLXa7NzMA0GCSqGSIb3DQEBCwUAMH8x
CzAJBgNVBAYTAlVBMQ0wCwYDVQQIDARLaWV2MRYwFAYDVQQHDA1DcnVzdGFsIFBh
cmNrMQ0wCwYDVQQKDARHZW5hMRIwEAYDVQQLDAlhY2lkY3Jhc2gxJjAkBgkqhkiG
9w0BCQEWF2FjaWRjcmFzaDIwMDVAZ21haWwuY29tMB4XDTIxMDEyODA3MDUwOVoX
DTIxMDIyNzA3MDUwOVowfzELMAkGA1UEBhMCVUExDTALBgNVBAgMBEtpZXYxFjAU
BgNVBAcMDUNydXN0YWwgUGFyY2sxDTALBgNVBAoMBEdlbmExEjAQBgNVBAsMCWFj
aWRjcmFzaDEmMCQGCSqGSIb3DQEJARYXYWNpZGNyYXNoMjAwNUBnbWFpbC5jb20w
gZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANIvhyyYxFqRgBQvAMbHJY/K7ALR
XWY0vYiKDBJKSVHDfPwcTz05F0R6GCbfelSU0/exJFEpNT+fjWYleIOf2eUiQQst
oCrP2Ha6F0ezA0aCPzMfTWWygx3dq/PK2+zrzazWlNaYH86LBRv7o8zHl2J3QwTB
6jplAlAuHWbo/kbBAgMBAAEwDQYJKoZIhvcNAQELBQADgYEAomUsrZ7z6LYv3hSJ
jEeTe+W8A0+Evuw+fwIRsGV/BgGzaRuR5W5PFZPIu4WtE9gvh1W2hXNJJfrNWwon
7iNHhgt7bXq396QHXi23IGgd6pFH+ReHi/0CNgLGrvYoTO/mbW5bDoAJ3o8/TzsZ
K3HGNukDL11Mzc3mZfLJvijxlCk=
-----END CERTIFICATE-----
`;

const failedKey = `-----BEGIN CERTIFICATE-----
MIICDDCCAXUCFG7PGqvZzucGAO10Ql/9UKSpvveiMA0GCSqGSIb3DQEBCwUAMEUx
CzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRl
cm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjEwMTMwMTg1NTU0WhcNMjEwMzAxMTg1
NTU0WjBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UE
CgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIGfMA0GCSqGSIb3DQEBAQUAA4GN
ADCBiQKBgQDFErqIhEfwdVVuZRZxKzZ3dBMuCroQxPvpUWJTBHMTqap28DkclhaA
BoUDMLDnB9c3ai6XJqKcn/9I8uN+A45pUuDJfyqCZwxB4CUXlIxMGzoKkwLyyixa
OnEZ0YHzsu4WBYztmgWAQAH6wfJ6XssRim6y+5SRp2NqhBMwouoQ4QIDAQABMA0G
CSqGSIb3DQEBCwUAA4GBAMEBzoa4LttzoBabb7itqn9wVL4JNTT0d6JERaXQAG8B
7N8jILxaV3EHtIYJ/exAGUYwIOyz/hOeNPgQfwwV2Xw9cQV9px9NpBGlIbqfLhh5
r/RMx/d2IIG1BUzsvuNXkODG/GG8k/0bpApiszHsiJe+hiBQGjND0Qbvggy2ptJw
-----END CERTIFICATE-----
`;

module.exports = {
    failedKey,
    privateKey,
    publicKey,
};