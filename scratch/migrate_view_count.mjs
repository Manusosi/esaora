const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'sbp_1f8ec9d7d71035c6fa4691ac2ad34c844313f963';
const PROJECT_REF  = process.env.SUPABASE_PROJECT_REF  || 'lwolkwezafxnywngwvnj';
const API_BASE     = 'https://api.supabase.com/v1';

const sql = `
CREATE OR REPLACE FUNCTION increment_article_view(article_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = article_id;
END;
$$;

-- Grant execution to all users (public)
GRANT EXECUTE ON FUNCTION increment_article_view(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_article_view(UUID) TO authenticated;
`;

async function migrate() {
  console.log('Applying migration to project:', PROJECT_REF);
  const r = await fetch(`${API_BASE}/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: { 
      Authorization: `Bearer ${ACCESS_TOKEN}`, 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ query: sql }),
  });
  
  const result = await r.json();
  if (!r.ok) {
    console.error('Migration failed:', JSON.stringify(result, null, 2));
    process.exit(1);
  }
  
  console.log('Migration applied successfully!');
}

migrate();
