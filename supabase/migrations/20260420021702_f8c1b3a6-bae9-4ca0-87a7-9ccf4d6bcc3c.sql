-- Chatbot conversations: full transcript + outcome
CREATE TABLE public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_type text NOT NULL CHECK (flow_type IN ('residential', 'commercial')),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  estimate_amount numeric,
  customer_name text,
  customer_email text,
  customer_phone text,
  converted_to_booking boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'in_progress',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create chatbot conversations"
  ON public.chatbot_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update chatbot conversations"
  ON public.chatbot_conversations FOR UPDATE
  USING (true);

CREATE POLICY "Admins can view chatbot conversations"
  ON public.chatbot_conversations FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete chatbot conversations"
  ON public.chatbot_conversations FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_chatbot_conversations_updated_at
  BEFORE UPDATE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Abandoned leads: captured email but no booking
CREATE TABLE public.abandoned_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.chatbot_conversations(id) ON DELETE CASCADE,
  flow_type text NOT NULL,
  customer_name text,
  customer_email text NOT NULL,
  customer_phone text,
  estimate_amount numeric,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  followup_sent boolean NOT NULL DEFAULT false,
  followup_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX abandoned_leads_followup_idx
  ON public.abandoned_leads (followup_sent, created_at);

ALTER TABLE public.abandoned_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create abandoned leads"
  ON public.abandoned_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view abandoned leads"
  ON public.abandoned_leads FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update abandoned leads"
  ON public.abandoned_leads FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete abandoned leads"
  ON public.abandoned_leads FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_abandoned_leads_updated_at
  BEFORE UPDATE ON public.abandoned_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable extensions for cron job
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;