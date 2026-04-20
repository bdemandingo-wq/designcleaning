
The build error is a duplicate identifier issue in `src/integrations/supabase/types.ts` — the `site_content` and `work_cards` table types appear twice. This file is auto-generated but the recent migration caused a duplication.

I'll inspect the file to confirm, then plan the fix.

## Plan

**Fix the build error in `src/integrations/supabase/types.ts`**

The file currently has duplicate entries for `site_content` and `work_cards` (lines ~176, 197 and ~281, 323). I'll remove the duplicate definitions, keeping only one canonical entry per table.

### Steps

1. View the affected line ranges in `src/integrations/supabase/types.ts` to identify exactly which blocks are duplicated.
2. Remove the duplicate `site_content` and `work_cards` table definitions so each appears only once in the `Tables` type.
3. Verify the file structure is still valid TypeScript.

### Notes

- No database changes needed — the migration ran successfully and tables exist correctly in Supabase.
- No other files need to change. The OurWorkPage and existing components will continue working once the type duplication is resolved.
- Build should pass after the dedupe.
