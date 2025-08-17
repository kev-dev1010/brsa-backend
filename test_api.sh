#!/bin/bash

# Script para testar a API BRSA Backend

# --- Configurações ---
BASE_URL="http://localhost:5000/api"
TOKEN="" # Será preenchido após o login

# --- Funções de Ajuda ---
function print_header {
    echo ""
    echo "==================================================================="
    echo "= $1"
    echo "==================================================================="
}

function print_success {
    echo "[SUCESSO] $1"
}

function print_error {
    echo "[ERRO] $1"
}

# --- Testes ---

# 1. Rota Pública
print_header "Testando Rota Pública: GET /api"
response=$(curl -s -w "\n%{http_code}" $BASE_URL)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 200 ]; then
    print_success "Rota pública funcionando. Mensagem: $body"
else
    print_error "Falha ao acessar a rota pública. Código: $http_code"
fi

# 2. Produtos (Rotas Públicas)
print_header "Testando Rotas de Produtos (Públicas)"

# 2.1. GET /api/products
echo "--- Teste: GET /api/products ---"
response=$(curl -s -w "\n%{http_code}" $BASE_URL/products)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 200 ]; then
    print_success "Listagem de produtos retornada. Resposta: $body"
else
    print_error "Falha ao listar produtos. Código: $http_code"
fi

# 2.2. GET /api/products/:id (exemplo com id=1)
echo "--- Teste: GET /api/products/1 ---"
response=$(curl -s -w "\n%{http_code}" $BASE_URL/products/1)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

# Este teste pode falhar se não houver produto com id 1, o que é esperado
if [ "$http_code" -eq 200 ]; then
    print_success "Produto com id=1 encontrado. Resposta: $body"
elif [ "$http_code" -eq 404 ]; then
    print_success "Produto com id=1 não encontrado (comportamento esperado se o DB estiver vazio)."
else
    print_error "Falha ao buscar produto por id. Código: $http_code"
fi

# 3. Autenticação
print_header "Testando Rotas de Autenticação"

# 3.1. POST /api/auth/register (Cenário de Sucesso)
echo "--- Teste: POST /api/auth/register (Novo Usuário) ---"
# Usamos timestamp para garantir um email único a cada execução
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

if [ "$http_code" -eq 201 ]; then
    print_success "Usuário registrado com sucesso. Resposta: $body"
else
    print_error "Falha ao registrar usuário. Código: $http_code | Resposta: $body"
fi

# 3.2. POST /api/auth/login (Cenário de Sucesso)
echo "--- Teste: POST /api/auth/login ---"
response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" \
    -d '{
          "username": "'$NEW_USER_EMAIL'",
          "password": "password123"
        }' \
    $BASE_URL/auth/login)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 200 ]; then
    TOKEN=$(echo $body | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
    if [ -z "$TOKEN" ]; then
        print_error "Login bem-sucedido, mas não foi possível extrair o token."
    else
        print_success "Login realizado com sucesso. Token obtido: $TOKEN"
    fi
else
    print_error "Falha no login. Código: $http_code | Resposta: $body"
fi

# --- A partir daqui, os testes precisam de autenticação ---

if [ -z "$TOKEN" ]; then
    echo ""
    print_error "Não foi possível obter o token de autenticação. Os testes de rotas protegidas serão ignorados."
    exit 1
fi

# 4. Rotas de Usuário (Protegidas)
print_header "Testando Rotas de Usuário (Protegidas)"

# 4.1. GET /api/users/profile
echo "--- Teste: GET /api/users/profile ---"
response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" $BASE_URL/users/profile)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 200 ]; then
    print_success "Perfil do usuário obtido com sucesso. Resposta: $body"
else
    print_error "Falha ao obter perfil do usuário. Código: $http_code | Resposta: $body"
fi


# 5. Rotas de Produtos (Protegidas)
print_header "Testando Rotas de Produtos (Protegidas)"

# 5.1. POST /api/products (Cenário de Falha - Cliente não pode criar)
echo "--- Teste: POST /api/products (Cliente tentando criar) ---"
response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
    -d '{
          "name": "Produto de Teste",
          "description": "Descrição do produto",
          "price": 100,
          "stock": 10
        }' \
    $BASE_URL/products)
http_code=$(tail -n1 <<< "$response")
body=$(sed '$d' <<< "$response")

if [ "$http_code" -eq 403 ]; then
    print_success "Acesso negado para cliente (comportamento esperado)."
else
    print_error "Cliente conseguiu criar produto ou outro erro ocorreu. Código: $http_code | Resposta: $body"
fi

echo ""
echo "--- Fim dos testes ---"
echo "Para testar os cenários de criação de produto e acesso de admin, seria necessário registrar e logar com um usuário 'employee' ou 'admin'."