-- Criar tabela para solicitações de serviços
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (todos podem inserir, apenas admin pode visualizar)
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Política para permitir que qualquer pessoa insira solicitações (público)
CREATE POLICY "Permitir inserção pública de solicitações"
ON public.service_requests
FOR INSERT
WITH CHECK (true);

-- Índice para melhor performance nas consultas por data
CREATE INDEX idx_service_requests_created_at ON public.service_requests(created_at DESC);