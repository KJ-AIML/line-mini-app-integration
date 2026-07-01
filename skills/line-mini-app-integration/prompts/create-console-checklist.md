# Prompt: create-console-checklist

Generate LINE Developers Console setup checklist.

Sections:
1. **Provider and channel**
   - Choose correct provider (cannot be moved later)
   - Create LINE MINI App channel type
   - Select correct service region

2. **Channel metadata**
   - Channel name, icon, description, email
   - Privacy policy URL, terms URL
   - Service company / development company disclosure if outsourced
   - Multi-language support for non-English services

3. **Web app settings**
   - Record all 3 LIFF IDs (Developing, Review, Published)
   - Set endpoint URLs per internal channel
   - Ensure HTTPS, no URL fragments
   - Choose scopes: openid, profile, email, chat_message.write
   - Channel consent simplification decision
   - Add-friend behavior configuration

4. **Testing and review**
   - Enroll testers
   - Deploy Review-channel code before requesting review
   - Confirm certified provider status (Thailand/Taiwan)

Output as copy-ready markdown checklist.
