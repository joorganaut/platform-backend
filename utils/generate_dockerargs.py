#!/usr/bin/env python
"""
Gregory Meloche <greg.meloche@scalepoynt.io>
Description : take a blob of configuration k=v pairs and output text formatted for Dockerfile ARG and ENV parameters
"""
with open("env.example", "r") as fh :
    sample = fh.readlines()
fh.close()

k = sorted(set(l.split("=")[0].strip() for l in sample if "=" in l and "#" not in l))
print("ARG %s\n" % "\nARG ".join(k))
[print("ENV %s=${%s}" % (v,v)) for v in k]

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cab05f8 (GitHub CI first pass)
=======
>>>>>>> 4492dc0244ceec6ebcca2adc4d244e362352cb9e
print("### github args")
[print('export %s=$(aws secretsmanager get-secret-value --secret-id=%s | jq -r .SecretString | jq -r ."%s")' % (v,v,v)) for v in k]

print("### github build args")
[print('--build-arg %s=${%s} \\' % (v,v)) for v in k]
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8cb8edd (Work in progress, testing ECR push)
=======
>>>>>>> cab05f8 (GitHub CI first pass)
=======
>>>>>>> 4492dc0244ceec6ebcca2adc4d244e362352cb9e
