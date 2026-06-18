// Flow 0 — Authentication, user management & client portal onboarding
function Flow0() {
  return (
    <Flow
      n="0"
      id="flow-auth"
      title="Auth & client portal onboarding"
      subtitle="From an empty tenant to a warehouse team that can log in and a client who can see their own portal. Covers tenant signup, email verification, MFA, user invites, client company creation, and the two client-invite paths (brand-new portal user vs. an existing one who must approve the new vendor link)."
      actors={['admin', 'operator', 'client']}
    >
      {/* 1 — Tenant signup */}
      <Step
        n={1}
        actor="admin"
        title="Register the tenant"
        note="An admin submits company name, slug, region and a password. Stoqr provisions the tenant and the first user, then emails a 24-hour verification link. The account cannot be used until the email is verified."
        transitions={[
          { label: 'users.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'warning', t: 'pending_verification' }] },
          { label: 'tenants.status', steps: [{ k: 'info', t: 'trial' }] },
        ]}
      >
        <Screen app="operator" crumb="Sign up" title="Create your workspace" w={460}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Field label="Company name" value="Acme Logistics Co." />
            <div style={{ display: 'flex', gap: 10 }}>
              <Field label="Workspace URL" value="acme" icon="link" mono />
              <Field label="Region" value="Singapore (sg)" icon="globe" w={150} />
            </div>
            <Field label="Work email" value="priya@acme.co" icon="mail" />
            <Field label="Password" value="••••••••••••" icon="lock" />
            <div style={{ marginTop: 4 }}><Btn variant="primary" icon="arrow-right" full>Create workspace</Btn></div>
          </div>
        </Screen>
      </Step>

      {/* 2 — Verify email */}
      <Step
        n={2}
        actor="admin"
        title="Verify the email address"
        note="The admin clicks the emailed link. The token is single-use and expires in 24 hours (max 3 resends/hour). On success the account activates and is logged straight in."
        transition={{ label: 'users.status', steps: [{ k: 'warning', t: 'pending_verification' }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Verify" title="Confirm your email" w={440}>
          <div style={{ textAlign: 'center', padding: '8px 6px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 9999, background: 'var(--success-bg)', border: '1px solid var(--success-border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <i data-lucide="mail-check" style={{ width: 20, height: 20, color: '#16A34A' }}></i>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Email verified</div>
            <div style={{ fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 4, marginBottom: 12 }}>priya@acme.co is confirmed. Signing you in…</div>
            <Btn variant="primary" full icon="arrow-right">Go to Overview</Btn>
          </div>
        </Screen>
      </Step>

      {/* 3 — Login + MFA branch */}
      <Step
        n={3}
        actor="operator"
        title="Log in — with the MFA branch"
        note="Tenant is resolved from the subdomain, the Argon2id hash is checked, then lockout state. The next move depends on whether MFA is enforced for the tenant."
      >
        <ScreenRow cols="minmax(0,0.9fr) minmax(0,1.1fr)">
          <Screen app="operator" crumb="Log in" title="acme.stoqr.app" w="100%">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Email" value="sam@acme.co" icon="mail" />
              <Field label="Password" value="••••••••••" icon="lock" />
              <Btn variant="primary" full>Continue</Btn>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '2px 0' }}>
                <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></span>
                <span style={{ fontSize: 10, color: 'var(--fg-muted)' }}>OR</span>
                <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></span>
              </div>
              <Btn variant="secondary" full icon="building">Log in with Okta (SSO)</Btn>
            </div>
          </Screen>
          <div>
            <Branch>
              <BranchCol kind="warning" label="MFA enforced">
                <Screen app="operator" title="Two-factor" w="100%" pad>
                  <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', marginBottom: 8 }}>Enter the 6-digit code from your authenticator.</div>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 9 }}>
                    {['4', '1', '9', '2', '0', '7'].map((d, i) => (
                      <div key={i} style={{ flex: 1, height: 32, border: '1px solid var(--border-default)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist Mono, monospace', fontWeight: 700, fontSize: 14 }}>{d}</div>
                    ))}
                  </div>
                  <Btn variant="primary" full size="sm">Verify</Btn>
                </Screen>
                <div style={{ marginTop: 9 }}><Transition label="" steps={[{ k: 'neutral', t: 'mfa_challenge' }, { k: 'success', t: 'access + refresh JWT' }]} /></div>
              </BranchCol>
              <BranchCol kind="success" label="No MFA">
                <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>JWT access token (15 min) + rotating refresh token (7 days) issued immediately. <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>auth.login.success</span> written to the hash-chained audit log with IP, device and geo.</div>
                <div style={{ marginTop: 9 }}><Banner kind="danger" icon="lock" title="Lockout guard">5 failed attempts in 15 min → <span style={{ fontFamily: 'Geist Mono, monospace' }}>status: locked</span>. Admin must unlock.</Banner></div>
              </BranchCol>
            </Branch>
          </div>
        </ScreenRow>
      </Step>

      {/* 4 — Invite warehouse user */}
      <Step
        n={4}
        actor="admin"
        title="Invite a warehouse user"
        note="From Team, the admin invites a teammate with a role and a warehouse scope. The user is created inactive and an invite email goes out. Bulk CSV import follows the same path for many users at once."
        transition={{ label: 'users.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'neutral', t: 'inactive' }] }}
      >
        <Screen app="operator" crumb="Team" title="Invite user" w={520}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Email" value="sam@acme.co" icon="mail" />
              <Field label="Role" value="Receiver" icon="shield" />
              <Field label="Warehouse" value="W-02 · Tuas" icon="warehouse" />
            </div>
            <div>
              <SLabel>Permissions · Receiver</SLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {['receiving:read', 'receiving:write', 'receiving:inspect', 'inventory:read'].map(p => (
                  <span key={p} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-secondary)', background: 'var(--slate-100)', padding: '2px 6px', borderRadius: 4 }}>{p}</span>
                ))}
              </div>
              <div style={{ marginTop: 12 }}><Btn variant="primary" full icon="send">Send invite</Btn></div>
            </div>
          </ScreenRow>
        </Screen>
      </Step>

      {/* 5 — Accept invite */}
      <Step
        n={5}
        actor="operator"
        title="Accept the invite & set a password"
        note="The invited user opens the link, sets a password against the tenant's policy, and is in. Accepting an invite verifies the email implicitly — no separate verification step."
        transition={{ label: 'users.status', steps: [{ k: 'neutral', t: 'inactive' }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Invite" title="Set your password" w={440}>
          <Banner kind="brand" icon="user-plus" title="You've been invited to Acme Logistics Co.">Role: Receiver · Warehouse W-02</Banner>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 10 }}>
            <Field label="New password" value="••••••••••••" icon="lock" />
            <div style={{ display: 'flex', gap: 7, fontSize: 10.5, color: 'var(--fg-tertiary)', flexWrap: 'wrap' }}>
              <span style={{ color: '#16A34A' }}>✓ 10+ chars</span>
              <span style={{ color: '#16A34A' }}>✓ upper + lower</span>
              <span style={{ color: '#16A34A' }}>✓ digit</span>
              <span style={{ color: '#16A34A' }}>✓ special</span>
            </div>
            <Btn variant="primary" full icon="check">Activate account</Btn>
          </div>
        </Screen>
      </Step>

      {/* 6 — Create client company */}
      <Step
        n={6}
        actor="admin"
        title="Create the client company"
        note="The business / CRM record for the tenant's customer — contacts, billing & shipping addresses, payment terms, contract dates and SLA. This is step one of the two-step client onboarding; nobody can log in yet."
        transition={{ label: 'clients.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Clients" title="New client" w={540}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Company name" value="Northwind Traders" />
              <Field label="Registration no." value="200934118K" mono />
              <Field label="Primary contact" value="Jordan Rivera" icon="user" />
              <Field label="Contact email" value="jordan@northwind.co" icon="mail" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Payment terms" value="Net 30" />
              <div style={{ display: 'flex', gap: 9 }}>
                <Field label="Contract start" value="Jul 1, 2026" w="50%" />
                <Field label="Contract end" value="Jun 30, 2027" w="50%" />
              </div>
              <Field label="Billing address" value="12 Tuas Ave, Singapore" icon="map-pin" />
              <div style={{ marginTop: 'auto' }}><Btn variant="primary" full icon="plus">Create client</Btn></div>
            </div>
          </ScreenRow>
        </Screen>
      </Step>

      {/* 7 — Invite client user (branch) */}
      <Step
        n={7}
        actor="admin"
        title="Invite a client portal user — two paths"
        note="The admin invites a specific person and sets visibility flags (inventory, billing, inbound, outbound, reports). What happens next depends on whether that email already has a Stoqr portal account anywhere in the network."
      >
        <Screen app="operator" crumb="Northwind Traders" title="Invite portal user" w={540}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Email" value="jordan@northwind.co" icon="mail" />
              <Field label="Portal role" value="ClientAdmin" icon="shield" />
            </div>
            <div>
              <SLabel>Visibility flags</SLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[['can_view_inventory', true], ['can_view_inbound', true], ['can_view_outbound', true], ['can_view_billing', false], ['can_view_reports', false]].map(([k, on]) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, color: 'var(--fg-secondary)' }}>{k}</span>
                    <span style={{ width: 26, height: 15, borderRadius: 9999, background: on ? '#2563EB' : 'var(--slate-200)', position: 'relative', flexShrink: 0 }}>
                      <span style={{ position: 'absolute', top: 2, left: on ? 13 : 2, width: 11, height: 11, borderRadius: 9999, background: '#fff' }}></span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScreenRow>
          <div style={{ marginTop: 11 }}><Btn variant="primary" icon="send">Send invite</Btn></div>
        </Screen>
        <div style={{ marginTop: 16 }}>
          <Branch>
            <BranchCol kind="success" label="New email → direct onboarding">
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>No existing portal account. Stoqr creates the global <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>client_portal_user</span> and an active access link, then emails an invite to set a password.</div>
              <Transition label="client_portal_access" steps={[{ k: 'muted', t: 'created', dot: false }, { k: 'success', t: 'active' }]} />
              <div style={{ marginTop: 8 }}><Transition label="portal_user" steps={[{ k: 'warning', t: 'pending_verification' }, { k: 'success', t: 'active' }]} /></div>
            </BranchCol>
            <BranchCol kind="warning" label="Existing email → approval required">
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Email already belongs to a portal user (linked to other vendors). A <b>pending</b> link is created and an approval email is sent — the user must accept before Acme appears in their vendor switcher.</div>
              <Transition label="client_portal_access" steps={[{ k: 'warning', t: 'pending' }, { k: 'success', t: 'active' }]} />
              <div style={{ marginTop: 8 }}><Banner kind="info" icon="git-merge">One email = one account across every vendor (SaaS mode).</Banner></div>
            </BranchCol>
          </Branch>
        </div>
      </Step>

      {/* 8 — Client logs in */}
      <Step
        n={8}
        actor="client"
        last
        title="Client logs into the portal"
        note="The client signs in to the separate, read-only portal (email/password + MFA only — no SSO). The session carries a type:client JWT. They see only what the visibility flags allow, scoped to the vendor selected in the switcher."
        transition={{ label: 'session', steps: [{ k: 'neutral', t: 'login' }, { k: 'info', t: 'mfa.verify' }, { k: 'success', t: 'client JWT' }] }}
      >
        <Screen app="client" crumb="Northwind Traders" title="Overview" w={620}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Welcome back, Jordan</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, border: '1px solid var(--border-default)', borderRadius: 6, padding: '3px 8px' }}>
              <i data-lucide="warehouse" style={{ width: 12, height: 12, color: 'var(--fg-tertiary)' }}></i>Acme · Tuas <i data-lucide="chevrons-up-down" style={{ width: 11, height: 11, color: 'var(--fg-muted)' }}></i>
            </span>
          </div>
          <StatRow items={[
            { label: 'On hand', value: '8,420', unit: 'units' },
            { label: 'Inbound jobs', value: '3' },
            { label: 'Outbound jobs', value: '1' },
            { label: 'Actions waiting', value: '4', c: '#D97706' },
          ]} />
          <div style={{ marginTop: 11 }}>
            <SLabel>Your access</SLabel>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Pill kind="success">Inventory</Pill>
              <Pill kind="success">Inbound</Pill>
              <Pill kind="success">Outbound</Pill>
              <Pill kind="muted" dot={false}>Billing — hidden</Pill>
              <Pill kind="muted" dot={false}>Reports — hidden</Pill>
            </div>
          </div>
        </Screen>
      </Step>
    </Flow>
  );
}
window.Flow0 = Flow0;
