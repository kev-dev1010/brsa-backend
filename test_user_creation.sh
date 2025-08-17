#!/bin/bash

# Script para testar a criação e busca de usuário

BASE_URL="http://localhost:5000/api"

# 1. Registrar um novo usuário
echo "--- Registrando novo usuário ---"
TIMESTAMP=$(date +%s)
NEW_USER_EMAIL="testuser$TIMESTAMP@example.com"
response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" \
    -d '{
          "username": "'$NEW_USER_EMAIL'",
          "password": "password123",
          "role": "customer"
        }' \
    $BASE_URL/auth/register)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -ne 201 ]; then
    echo "[ERRO] Falha ao registrar usuário. Código: $http_code | Resposta: $body"
    exit 1
fi

TOKEN=$(echo $body | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
if [ -z "$TOKEN" ]; then
    echo "[ERRO] Não foi possível extrair o token do registro."
    exit 1
fi

echo "Usuário registrado com sucesso. Token: $TOKEN"

# 2. Extrair ID do usuário do token (isso é uma simulação, não uma decodificação real)
# Apenas para fins de teste, vamos pegar o ID do db.json
USER_ID=$(cat /home/kev-dev/projetos/brsa/brsa-backend/db.json | grep $NEW_USER_EMAIL -B 1 | grep id | sed -n 's/.*"id": "\([^"]*\)".*/\1/p')

if [ -z "$USER_ID" ]; then
    echo "[ERRO] Não foi possível extrair o ID do usuário do db.json."
    exit 1
fi

echo "ID do usuário extraído do db.json: $USER_ID"

# 3. Buscar o usuário pelo ID (rota protegida)
echo "--- Buscando usuário pelo ID ---"
response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" $BASE_URL/users/$USER_ID)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 200 ]; then
    echo "[SUCESSO] Usuário encontrado com sucesso. Resposta: $body"
else
    echo "[ERRO] Falha ao buscar usuário pelo ID. Código: $http_code | Resposta: $body"
fi
