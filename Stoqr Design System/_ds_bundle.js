/* @ds-bundle: {"format":3,"namespace":"StoqrDesignSystem_019df8","components":[],"sourceHashes":{"flows/flow-0-auth.jsx":"f8ef5facd5b5","flows/flow-1-inventory.jsx":"ea6391519c26","flows/flow-2-inbound.jsx":"3c6079ed5b79","flows/flow-3-outbound.jsx":"27d0bf956676","flows/flow-4-feed.jsx":"112a40c6c7af","flows/flow-5-requests.jsx":"b099e7aec688","flows/flow-6-vessels.jsx":"7deb143fb0e2","flows/flow-7-billing.jsx":"fb513b795db3","flows/flowkit.jsx":"560a6f720564","flows/importer.jsx":"34c7fb22a6b5","preview/tweaks-panel.jsx":"6591467622ed","ui_kits/client/ClientPages.jsx":"0c3199cf909f","ui_kits/client/ClientShell.jsx":"cd8ea1b23e5c","ui_kits/client/MoreClientPages.jsx":"7a7bed955215","ui_kits/operator/CycleCountsPage.jsx":"d0a4160d7946","ui_kits/operator/InventoryPage.jsx":"ab1ec880235e","ui_kits/operator/MorePages.jsx":"7961ad1fceb5","ui_kits/operator/OverviewPage.jsx":"0c3b1359fcd3","ui_kits/operator/Shell.jsx":"58253e8eb00c","ui_kits/operator/WorkflowsPage.jsx":"0306e0c184d5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StoqrDesignSystem_019df8 = window.StoqrDesignSystem_019df8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// flows/flow-0-auth.jsx
try { (() => {
// Flow 0 — Authentication, user management & client portal onboarding
function Flow0() {
  return /*#__PURE__*/React.createElement(Flow, {
    n: "0",
    id: "flow-auth",
    title: "Auth & client portal onboarding",
    subtitle: "From an empty tenant to a warehouse team that can log in and a client who can see their own portal. Covers tenant signup, email verification, MFA, user invites, client company creation, and the two client-invite paths (brand-new portal user vs. an existing one who must approve the new vendor link).",
    actors: ['admin', 'operator', 'client']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "admin",
    title: "Register the tenant",
    note: "An admin submits company name, slug, region and a password. Stoqr provisions the tenant and the first user, then emails a 24-hour verification link. The account cannot be used until the email is verified.",
    transitions: [{
      label: 'users.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'warning',
        t: 'pending_verification'
      }]
    }, {
      label: 'tenants.status',
      steps: [{
        k: 'info',
        t: 'trial'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Sign up",
    title: "Create your workspace",
    w: 460
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Company name",
    value: "Acme Logistics Co."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Workspace URL",
    value: "acme",
    icon: "link",
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Region",
    value: "Singapore (sg)",
    icon: "globe",
    w: 150
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Work email",
    value: "priya@acme.co",
    icon: "mail"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    icon: "lock"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "arrow-right",
    full: true
  }, "Create workspace"))))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "admin",
    title: "Verify the email address",
    note: "The admin clicks the emailed link. The token is single-use and expires in 24 hours (max 3 resends/hour). On success the account activates and is logged straight in.",
    transition: {
      label: 'users.status',
      steps: [{
        k: 'warning',
        t: 'pending_verification'
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Verify",
    title: "Confirm your email",
    w: 440
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '8px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      background: 'var(--success-bg)',
      border: '1px solid var(--success-border)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "mail-check",
    style: {
      width: 20,
      height: 20,
      color: '#16A34A'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "Email verified"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 4,
      marginBottom: 12
    }
  }, "priya@acme.co is confirmed. Signing you in\u2026"), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "arrow-right"
  }, "Go to Overview")))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "operator",
    title: "Log in \u2014 with the MFA branch",
    note: "Tenant is resolved from the subdomain, the Argon2id hash is checked, then lockout state. The next move depends on whether MFA is enforced for the tenant."
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,0.9fr) minmax(0,1.1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Log in",
    title: "acme.stoqr.app",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: "sam@acme.co",
    icon: "mail"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    icon: "lock"
  }), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true
  }, "Continue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '2px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--fg-muted)'
    }
  }, "OR"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-subtle)'
    }
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    full: true,
    icon: "building"
  }, "Log in with Okta (SSO)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "warning",
    label: "MFA enforced"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Two-factor",
    w: "100%",
    pad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      marginBottom: 8
    }
  }, "Enter the 6-digit code from your authenticator."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      marginBottom: 9
    }
  }, ['4', '1', '9', '2', '0', '7'].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 32,
      border: '1px solid var(--border-default)',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Geist Mono, monospace',
      fontWeight: 700,
      fontSize: 14
    }
  }, d))), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    size: "sm"
  }, "Verify")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Transition, {
    label: "",
    steps: [{
      k: 'neutral',
      t: 'mfa_challenge'
    }, {
      k: 'success',
      t: 'access + refresh JWT'
    }]
  }))), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "No MFA"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5
    }
  }, "JWT access token (15 min) + rotating refresh token (7 days) issued immediately. ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "auth.login.success"), " written to the hash-chained audit log with IP, device and geo."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "danger",
    icon: "lock",
    title: "Lockout guard"
  }, "5 failed attempts in 15 min \u2192 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace'
    }
  }, "status: locked"), ". Admin must unlock."))))))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "admin",
    title: "Invite a warehouse user",
    note: "From Team, the admin invites a teammate with a role and a warehouse scope. The user is created inactive and an invite email goes out. Bulk CSV import follows the same path for many users at once.",
    transition: {
      label: 'users.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'neutral',
        t: 'inactive'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Team",
    title: "Invite user",
    w: 520
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: "sam@acme.co",
    icon: "mail"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Role",
    value: "Receiver",
    icon: "shield"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Warehouse",
    value: "W-02 \xB7 Tuas",
    icon: "warehouse"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SLabel, null, "Permissions \xB7 Receiver"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5
    }
  }, ['receiving:read', 'receiving:write', 'receiving:inspect', 'inventory:read'].map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      color: 'var(--fg-secondary)',
      background: 'var(--slate-100)',
      padding: '2px 6px',
      borderRadius: 4
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "send"
  }, "Send invite")))))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "operator",
    title: "Accept the invite & set a password",
    note: "The invited user opens the link, sets a password against the tenant's policy, and is in. Accepting an invite verifies the email implicitly \u2014 no separate verification step.",
    transition: {
      label: 'users.status',
      steps: [{
        k: 'neutral',
        t: 'inactive'
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Invite",
    title: "Set your password",
    w: 440
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "user-plus",
    title: "You've been invited to Acme Logistics Co."
  }, "Role: Receiver \xB7 Warehouse W-02"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "New password",
    value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    icon: "lock"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      fontSize: 10.5,
      color: 'var(--fg-tertiary)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#16A34A'
    }
  }, "\u2713 10+ chars"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#16A34A'
    }
  }, "\u2713 upper + lower"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#16A34A'
    }
  }, "\u2713 digit"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#16A34A'
    }
  }, "\u2713 special")), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "check"
  }, "Activate account")))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "admin",
    title: "Create the client company",
    note: "The business / CRM record for the tenant's customer \u2014 contacts, billing & shipping addresses, payment terms, contract dates and SLA. This is step one of the two-step client onboarding; nobody can log in yet.",
    transition: {
      label: 'clients.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Clients",
    title: "New client",
    w: 540
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Company name",
    value: "Northwind Traders"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Registration no.",
    value: "200934118K",
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Primary contact",
    value: "Jordan Rivera",
    icon: "user"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Contact email",
    value: "jordan@northwind.co",
    icon: "mail"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Payment terms",
    value: "Net 30"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Contract start",
    value: "Jul 1, 2026",
    w: "50%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Contract end",
    value: "Jun 30, 2027",
    w: "50%"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Billing address",
    value: "12 Tuas Ave, Singapore",
    icon: "map-pin"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "plus"
  }, "Create client")))))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actor: "admin",
    title: "Invite a client portal user \u2014 two paths",
    note: "The admin invites a specific person and sets visibility flags (inventory, billing, inbound, outbound, reports). What happens next depends on whether that email already has a Stoqr portal account anywhere in the network."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Northwind Traders",
    title: "Invite portal user",
    w: 540
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: "jordan@northwind.co",
    icon: "mail"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Portal role",
    value: "ClientAdmin",
    icon: "shield"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SLabel, null, "Visibility flags"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, [['can_view_inventory', true], ['can_view_inbound', true], ['can_view_outbound', true], ['can_view_billing', false], ['can_view_reports', false]].map(([k, on]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10.5,
      color: 'var(--fg-secondary)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 15,
      borderRadius: 9999,
      background: on ? '#2563EB' : 'var(--slate-200)',
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 13 : 2,
      width: 11,
      height: 11,
      borderRadius: 9999,
      background: '#fff'
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "send"
  }, "Send invite"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "New email \u2192 direct onboarding"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "No existing portal account. Stoqr creates the global ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "client_portal_user"), " and an active access link, then emails an invite to set a password."), /*#__PURE__*/React.createElement(Transition, {
    label: "client_portal_access",
    steps: [{
      k: 'muted',
      t: 'created',
      dot: false
    }, {
      k: 'success',
      t: 'active'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Transition, {
    label: "portal_user",
    steps: [{
      k: 'warning',
      t: 'pending_verification'
    }, {
      k: 'success',
      t: 'active'
    }]
  }))), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "warning",
    label: "Existing email \u2192 approval required"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Email already belongs to a portal user (linked to other vendors). A ", /*#__PURE__*/React.createElement("b", null, "pending"), " link is created and an approval email is sent \u2014 the user must accept before Acme appears in their vendor switcher."), /*#__PURE__*/React.createElement(Transition, {
    label: "client_portal_access",
    steps: [{
      k: 'warning',
      t: 'pending'
    }, {
      k: 'success',
      t: 'active'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "git-merge"
  }, "One email = one account across every vendor (SaaS mode).")))))), /*#__PURE__*/React.createElement(Step, {
    n: 8,
    actor: "client",
    last: true,
    title: "Client logs into the portal",
    note: "The client signs in to the separate, read-only portal (email/password + MFA only \u2014 no SSO). The session carries a type:client JWT. They see only what the visibility flags allow, scoped to the vendor selected in the switcher.",
    transition: {
      label: 'session',
      steps: [{
        k: 'neutral',
        t: 'login'
      }, {
        k: 'info',
        t: 'mfa.verify'
      }, {
        k: 'success',
        t: 'client JWT'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Overview",
    w: 620
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "Welcome back, Jordan"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 11,
      fontWeight: 600,
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      padding: '3px 8px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "warehouse",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-tertiary)'
    }
  }), "Acme \xB7 Tuas ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevrons-up-down",
    style: {
      width: 11,
      height: 11,
      color: 'var(--fg-muted)'
    }
  }))), /*#__PURE__*/React.createElement(StatRow, {
    items: [{
      label: 'On hand',
      value: '8,420',
      unit: 'units'
    }, {
      label: 'Inbound jobs',
      value: '3'
    }, {
      label: 'Outbound jobs',
      value: '1'
    }, {
      label: 'Actions waiting',
      value: '4',
      c: '#D97706'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(SLabel, null, "Your access"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "success"
  }, "Inventory"), /*#__PURE__*/React.createElement(Pill, {
    kind: "success"
  }, "Inbound"), /*#__PURE__*/React.createElement(Pill, {
    kind: "success"
  }, "Outbound"), /*#__PURE__*/React.createElement(Pill, {
    kind: "muted",
    dot: false
  }, "Billing \u2014 hidden"), /*#__PURE__*/React.createElement(Pill, {
    kind: "muted",
    dot: false
  }, "Reports \u2014 hidden"))))));
}
window.Flow0 = Flow0;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-0-auth.jsx", error: String((e && e.message) || e) }); }

// flows/flow-1-inventory.jsx
try { (() => {
// Flow 1 — Warehouse setup, inventory & cycle counts
function Flow1() {
  return /*#__PURE__*/React.createElement(Flow, {
    n: "1",
    id: "flow-inventory",
    title: "Warehouse setup, inventory & cycle counts",
    subtitle: "Stand up a warehouse, generate its bins, define an item, then run the cycle-count loop that keeps system stock honest \u2014 blind counts, variance handling, and the three ways a variance resolves (auto-approve, auto-adjust, supervisor approval).",
    actors: ['admin', 'operator', 'supervisor', 'system']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "admin",
    title: "Create a warehouse",
    note: "Name, code, address, timezone and a configurable location-code pattern. The pattern drives auto-generated bin codes in the next step.",
    transition: {
      label: 'warehouses.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Warehouses",
    title: "New warehouse",
    w: 540
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    value: "Tuas Distribution Centre"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Code",
    value: "W-02",
    mono: true,
    w: "46%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Timezone",
    value: "Asia/Singapore",
    w: "54%"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Address",
    value: "12 Tuas Ave 1, Singapore",
    icon: "map-pin"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SLabel, null, "Location code pattern"), /*#__PURE__*/React.createElement(Field, {
    value: "{floor}-{zone}-{aisle}-{rack}-{level}",
    mono: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Preview"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 13,
      fontWeight: 600,
      color: '#2563EB',
      marginTop: 2
    }
  }, "1-STR-A01-R05-L03"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "plus"
  }, "Create warehouse")))))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "admin",
    title: "Generate bins from a template",
    note: "Define a zone, the aisles, racks per aisle and levels per rack. Stoqr fans the template out into every bin \u2014 each with an auto code, default rules and a QR value. (CSV import is the alternative for existing warehouses with their own codes.)",
    transition: {
      label: 'locations.status',
      steps: [{
        k: 'muted',
        t: 'generated',
        dot: false
      }, {
        k: 'success',
        t: 'available'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "W-02 \xB7 Layout",
    title: "Generate locations",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Zone",
    value: "Storage (STR) \xB7 Floor 1",
    icon: "layers"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Aisles",
    value: "6",
    mono: true,
    w: "33%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Racks / aisle",
    value: "8",
    mono: true,
    w: "33%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Levels / rack",
    value: "4",
    mono: true,
    w: "34%"
  })), /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "grid-3x3",
    title: "192 bins will be generated"
  }, "6 \xD7 8 \xD7 4 \u2014 each gets a code, QR label and default capacity rules."), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "sparkles"
  }, "Generate 192 bins"))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Generated \xB7 QR labels ready",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Code',
      mono: true
    }, {
      t: 'Type'
    }, {
      t: 'QR',
      align: 'center',
      w: '52px'
    }, {
      t: 'Status',
      align: 'right',
      w: '92px'
    }],
    rows: [['1-STR-A01-R01-L01', 'shelf', {
      t: '▦',
      c: '#64748B'
    }, {
      pill: 'success',
      t: 'avail'
    }], ['1-STR-A01-R01-L02', 'shelf', {
      t: '▦',
      c: '#64748B'
    }, {
      pill: 'success',
      t: 'avail'
    }], ['1-STR-A01-R02-L01', 'shelf', {
      t: '▦',
      c: '#64748B'
    }, {
      pill: 'success',
      t: 'avail'
    }], ['1-STR-A01-R02-L02', 'shelf', {
      t: '▦',
      c: '#64748B'
    }, {
      pill: 'success',
      t: 'avail'
    }], ['1-STR-A02-R01-L01', 'shelf', {
      t: '▦',
      c: '#64748B'
    }, {
      pill: 'success',
      t: 'avail'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "1\u20135 of 192"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "printer"
  }, "Print QR labels"))))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "operator",
    title: "Define an item (SKU)",
    note: "WMS-essential fields only. Storage class and tracking type drive bin-rule validation; the reorder point + alert toggle feed low-stock warnings. UoM conversions let the team receive in cases and pick in eaches.",
    transition: {
      label: 'inventory_items.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Inventory",
    title: "New item",
    w: 560
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "SKU",
    value: "SKU-049282-NV",
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    value: "Navigator backpack 45L"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Base UoM",
    value: "each",
    w: "50%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Case",
    value: "24 each",
    mono: true,
    w: "50%"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Storage class",
    value: "ambient",
    w: "50%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tracking",
    value: "none",
    w: "50%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Reorder point",
    value: "50",
    mono: true,
    w: "50%"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Reorder qty",
    value: "200",
    mono: true,
    w: "50%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11.5,
      color: 'var(--fg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 15,
      borderRadius: 9999,
      background: '#2563EB',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: 13,
      width: 11,
      height: 11,
      borderRadius: 9999,
      background: '#fff'
    }
  })), "Low-stock alert enabled"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "plus"
  }, "Create item")))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "operator",
    title: "Stock lands in the inventory table",
    note: "Once received (full inbound is flow 2), each stock record lives per item \xD7 location \xD7 batch, carries its own anti-theft QR, and rolls up to on-hand / available. Items below their reorder point surface as Low; zero shows Out.",
    transition: {
      label: 'inventory_stocks.status',
      steps: [{
        k: 'success',
        t: 'available'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Inventory",
    title: "4,821 SKUs \xB7 W-02",
    w: 680
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: 'SKU',
      mono: true,
      w: '146px'
    }, {
      t: 'Description'
    }, {
      t: 'Bin',
      mono: true,
      w: '92px'
    }, {
      t: 'On hand',
      align: 'right',
      w: '74px'
    }, {
      t: 'Avail',
      align: 'right',
      w: '62px'
    }, {
      t: 'Status',
      w: '78px'
    }],
    rows: [['SKU-049281-NV', 'Navigator backpack 30L', 'A-12-03', {
      t: '1,240',
      b: true
    }, {
      t: '1,118'
    }, {
      pill: 'success',
      t: 'OK'
    }], {
      __sel: true,
      cells: ['SKU-049282-NV', 'Navigator backpack 45L', 'A-12-04', {
        t: '42',
        b: true
      }, {
        t: '42'
      }, {
        pill: 'warning',
        t: 'Low'
      }]
    }, ['SKU-051104-TR', 'Trail bottle 750ml — slate', 'B-04-11', {
      t: '0',
      b: true
    }, {
      t: '0'
    }, {
      pill: 'danger',
      t: 'Out'
    }], ['SKU-062013-AS', 'Ascent jacket M', 'C-08-02', {
      t: '86',
      b: true
    }, {
      t: '80'
    }, {
      pill: 'success',
      t: 'OK'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "warning",
    icon: "bell-ring",
    title: "2 items below reorder point"
  }, "Notifies users with inventory:read and any client with can_view_inventory.")))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "supervisor",
    title: "Create a cycle count plan",
    note: "A plan scopes the count \u2014 full warehouse, a zone, or an ABC class. Blind counting hides the expected quantity from the operator. On schedule, Stoqr generates one task per item \xD7 location in scope.",
    transitions: [{
      label: 'cycle_count_plans.status',
      steps: [{
        k: 'neutral',
        t: 'draft'
      }, {
        k: 'info',
        t: 'scheduled'
      }]
    }, {
      label: 'cycle_count_tasks.status',
      steps: [{
        k: 'muted',
        t: 'generated',
        dot: false
      }, {
        k: 'warning',
        t: 'pending'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Cycle counts",
    title: "New plan",
    w: 560
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Plan name",
    value: "Zone A \u2014 weekly A-class"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Count type",
    value: "ABC class \xB7 A",
    icon: "layers"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Scheduled",
    value: "Mon, Jun 15",
    icon: "calendar"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 15,
      borderRadius: 9999,
      background: '#2563EB',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: 13,
      width: 11,
      height: 11,
      borderRadius: 9999,
      background: '#fff'
    }
  })), "Blind count"), /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "clipboard-list",
    title: "38 tasks will be generated"
  }, "One per item \xD7 location across the A-class in Zone A."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "calendar-check"
  }, "Schedule plan")))))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "operator",
    title: "Count a bin (blind)",
    note: "Operator self-assigns a task, scans the location QR and enters what they physically count. Because it's a blind count, the expected figure stays hidden. Stoqr computes the variance on submit.",
    transition: {
      label: 'cycle_count_tasks.status',
      steps: [{
        k: 'warning',
        t: 'pending'
      }, {
        k: 'info',
        t: 'in_progress'
      }, {
        k: 'brand',
        t: 'counted'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Cycle counts \xB7 #2841",
    title: "Count task",
    w: 460
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '9px 11px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      background: 'var(--slate-50)',
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "scan-line",
    style: {
      width: 18,
      height: 18,
      color: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Location scanned"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 13,
      fontWeight: 600
    }
  }, "1-STR-A12-R04 \xB7 SKU-049282-NV")), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 16,
      height: 16,
      color: '#16A34A',
      marginLeft: 'auto'
    }
  })), /*#__PURE__*/React.createElement(SLabel, null, "Counted quantity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 44,
      border: '1.5px solid #2563EB',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 22,
      fontWeight: 700
    }
  }, "38"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, "units")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 11,
      color: 'var(--fg-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "eye-off",
    style: {
      width: 12,
      height: 12
    }
  }), "Expected quantity hidden (blind count)"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "check"
  }, "Submit count")))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actors: ['system', 'supervisor'],
    title: "Variance resolves three ways",
    note: "Counted \u2212 expected = variance. Where it lands against the tolerance threshold decides the path. Any adjustment writes a stock_movement; if it would push on-hand below allocated, the affected allocations are flagged needs_resource for re-sourcing."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Variance = 0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Count matches system. Auto-approved, no adjustment, no movement."), /*#__PURE__*/React.createElement(Transition, {
    label: "task",
    steps: [{
      k: 'brand',
      t: 'counted'
    }, {
      k: 'success',
      t: 'approved'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "warning",
    label: "Within threshold"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Small variance auto-adjusts. A stock_movement (type: adjust) is posted automatically."), /*#__PURE__*/React.createElement(Transition, {
    label: "task",
    steps: [{
      k: 'brand',
      t: 'counted'
    }, {
      k: 'success',
      t: 'adjusted'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "danger",
    label: "Exceeds threshold"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Held for supervisor sign-off before any adjustment posts."), /*#__PURE__*/React.createElement(Transition, {
    label: "task",
    steps: [{
      k: 'brand',
      t: 'counted'
    }, {
      k: 'warning',
      t: 'pending_approval'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Approvals",
    title: "Cycle count variance \u2014 needs sign-off",
    w: 620
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 13,
      fontWeight: 600
    }
  }, "SKU-049282-NV"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, "1-STR-A12-R04"), /*#__PURE__*/React.createElement(Pill, {
    kind: "warning"
  }, "Exceeds 5%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 8,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 700
    }
  }, "Expected"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 17,
      fontWeight: 700,
      marginTop: 2
    }
  }, "42")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 700
    }
  }, "Counted"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 17,
      fontWeight: 700,
      marginTop: 2
    }
  }, "38")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--danger-border)',
      borderRadius: 6,
      padding: '8px 10px',
      background: 'var(--danger-bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#991B1B',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 700
    }
  }, "Variance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 17,
      fontWeight: 700,
      marginTop: 2,
      color: '#DC2626'
    }
  }, "\u22124"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "success",
    icon: "check"
  }, "Approve & adjust"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "rotate-ccw"
  }, "Request recount")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "link-2"
  }, "If the \u22124 adjustment drives on-hand below allocated, the affected stock_allocations flip to ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace'
    }
  }, "needs_resource"), " and a correction row is written.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Transition, {
    label: "on approve \xB7 task",
    steps: [{
      k: 'warning',
      t: 'pending_approval'
    }, {
      k: 'success',
      t: 'adjusted'
    }]
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 8,
    actor: "supervisor",
    last: true,
    title: "Plan completes",
    note: "When every task is approved or adjusted, the plan closes. The reconciled counts feed ABC re-classification and the next count schedule.",
    transition: {
      label: 'cycle_count_plans.status',
      steps: [{
        k: 'info',
        t: 'in_progress'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Cycle counts",
    title: "Plan #2841 \u2014 complete",
    w: 520
  }, /*#__PURE__*/React.createElement(StatRow, {
    items: [{
      label: 'Tasks',
      value: '38'
    }, {
      label: 'Matched',
      value: '34',
      c: '#16A34A'
    }, {
      label: 'Adjusted',
      value: '3',
      c: '#D97706'
    }, {
      label: 'Recount',
      value: '1',
      c: '#DC2626'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "success",
    icon: "badge-check",
    title: "Reconciled \u2014 96% match rate"
  }, "Net adjustment \u22127 units across 3 bins. ABC re-class queued.")))));
}
window.Flow1 = Flow1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-1-inventory.jsx", error: String((e && e.message) || e) }); }

// flows/flow-2-inbound.jsx
try { (() => {
// Flow 2 — Inbound: storage list import to GRN
function Flow2() {
  const INBOUND_STAGES = [{
    key: 'uploaded',
    label: 'uploaded'
  }, {
    key: 'saved',
    label: 'saved'
  }, {
    key: 'queued',
    label: 'queued'
  }, {
    key: 'processing',
    label: 'processing'
  }, {
    key: 'processed',
    label: 'processed'
  }];
  return /*#__PURE__*/React.createElement(Flow, {
    n: "2",
    id: "flow-inbound",
    title: "Inbound \u2014 storage list to GRN",
    subtitle: "A client sends goods in for storage. The heart of this flow is the file import: a drag-and-drop storage list (Excel/CSV) that's mapped to Stoqr's fields, parsed, and corrected row-by-row before a Job is ever created. Then the Job runs its tenant-defined flow steps \u2014 manual work, automated system steps \u2014 ending in a GRN and live stock.",
    actors: ['admin', 'operator', 'supervisor', 'system']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "admin",
    title: "Define the inbound flow template",
    note: "Flows are tenant-level process templates \u2014 every client follows the same steps. Each step has a type that decides how it runs: manual work, a document gate, an automated system action, or a supervisor approval. System steps (violet) need no assignment.",
    transition: {
      label: 'flows.is_active',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Flows \xB7 Inbound",
    title: "Bonded Import",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: '#',
      w: '26px',
      mono: true,
      align: 'center'
    }, {
      t: 'Step'
    }, {
      t: 'Type',
      w: '120px',
      mono: true
    }, {
      t: 'Assigned team',
      w: '128px'
    }],
    rows: [['1', 'Unloading', 'work', 'Inbound crew'], ['2', 'Customs docs', 'file_collection', 'Compliance'], ['3', 'Record quantities', 'prebuilt', 'Receiving'], ['4', 'Update inventory', {
      t: 'system',
      c: '#7C3AED',
      b: true
    }, {
      t: 'auto',
      c: 'var(--fg-muted)'
    }], ['5', 'Generate GRN', {
      t: 'system',
      c: '#7C3AED',
      b: true
    }, {
      t: 'auto',
      c: 'var(--fg-muted)'
    }], ['6', 'Supervisor sign-off', 'approval', 'Supervisor']]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "git-branch",
    title: "Steps run in order; any step can be flagged parallel"
  }, "A file_collection step can't complete until every mandatory document is uploaded.")))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "operator",
    title: "Drop the storage list file",
    note: "Drag an Excel or CSV onto the importer. Stoqr saves the raw file to blob storage and queues it \u2014 the parse runs in the background and streams its status back. A malformed file fails here without touching anything downstream.",
    transition: {
      label: 'storage_list_files.status',
      steps: [{
        k: 'muted',
        t: 'uploaded',
        dot: false
      }, {
        k: 'info',
        t: 'queued'
      }, {
        k: 'brand',
        t: 'processing'
      }, {
        k: 'success',
        t: 'processed'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Inbound \xB7 Import",
    title: "Upload storage list",
    w: "100%"
  }, /*#__PURE__*/React.createElement(Dropzone, {
    state: "dragging"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(SLabel, null, "Just uploaded"), /*#__PURE__*/React.createElement(Dropzone, {
    state: "uploading",
    name: "northwind-storage-2026-06-14.xlsx",
    size: "318 KB",
    pct: 72,
    type: "xlsx"
  }))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Parse \xB7 background job",
    w: "100%"
  }, /*#__PURE__*/React.createElement(Dropzone, {
    state: "done",
    name: "northwind-storage-2026-06-14.xlsx",
    size: "318 KB",
    rows: 248,
    type: "xlsx"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(SLabel, null, "Pipeline")), /*#__PURE__*/React.createElement(ParsePipeline, {
    stages: INBOUND_STAGES,
    current: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "cpu",
    title: "StorageListProcessorJob"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "248 rows"), " extracted. Next: map columns & review."))))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "operator",
    title: "Map the file's columns to Stoqr fields",
    note: "Every client's spreadsheet is shaped differently. The first time, you map their columns to Stoqr's fixed field set and save it as that client's template \u2014 next upload, the mapping is detected automatically. Required fields (sku, item_name, expected_quantity) must be filled before the parse can be trusted."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Import \xB7 northwind-storage-2026-06-14.xlsx",
    title: "Column mapping",
    w: 680
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MapConfig, {
    items: [{
      k: 'Sheet',
      v: 'Sheet1'
    }, {
      k: 'Header row',
      v: '1'
    }, {
      k: 'Data starts',
      v: '2'
    }]
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      fontWeight: 600,
      color: '#1E40AF',
      background: '#DBEAFE',
      border: '1px solid #93C5FD',
      borderRadius: 6,
      padding: '4px 9px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bookmark",
    style: {
      width: 12,
      height: 12
    }
  }), "Northwind Standard Format")), /*#__PURE__*/React.createElement(ColumnMap, {
    rows: [{
      col: 'A',
      header: 'Part No',
      sample: 'SKU-049281-NV',
      field: 'sku',
      disp: 'required'
    }, {
      col: 'B',
      header: 'Item Description',
      sample: 'Navigator backpack 30L',
      field: 'item_name',
      disp: 'required'
    }, {
      col: 'C',
      header: 'Qty Expected',
      sample: '600',
      field: 'expected_quantity',
      disp: 'required'
    }, {
      col: 'D',
      header: 'UOM',
      sample: 'each',
      field: 'unit_of_measure',
      disp: 'optional'
    }, {
      col: 'E',
      header: 'Batch / Lot',
      sample: 'LOT-22418',
      field: 'batch_number',
      disp: 'optional'
    }, {
      col: 'F',
      header: 'Expiry',
      sample: '2027-03-01',
      field: 'expiry_date',
      disp: 'optional'
    }, {
      col: 'G',
      header: 'Cost Centre',
      sample: 'CC-4471',
      field: '—',
      disp: 'dropped'
    }, {
      col: 'H',
      header: 'Net Wt (kg)',
      sample: '1.8',
      unmapped: true,
      disp: 'required'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "arrow-right"
  }, "Apply mapping & review"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "save",
    size: "md"
  }, "Save as template"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: '#DC2626',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alert-circle",
    style: {
      width: 13,
      height: 13
    }
  }), "1 column needs a field")))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "operator",
    title: "Review parsed rows & fix errors inline",
    note: "The parser validates every row against the mapped types and checks each SKU against your inventory. Bad cells are flagged in place \u2014 fix them inline, resolve unknown SKUs to an item (or create it), and clear warnings \u2014 without leaving the screen. The Job can't be created while errors remain.",
    transitions: [{
      label: 'storage_list_lines.status',
      steps: [{
        k: 'warning',
        t: 'pending',
        dot: true
      }, {
        k: 'success',
        t: 'received-ready'
      }]
    }, {
      label: 'storage_list_files.status',
      steps: [{
        k: 'success',
        t: 'processed'
      }, {
        k: 'brand',
        t: 'job_created'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Import \xB7 review",
    title: "Review & correct \u2014 248 rows",
    w: 720
  }, /*#__PURE__*/React.createElement(ValidationBar, {
    total: 248,
    ready: 244,
    errors: 3,
    warnings: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(ReviewGrid, {
    cols: [{
      t: 'Ln',
      w: '34px',
      mono: true,
      align: 'center'
    }, {
      t: 'SKU',
      w: '150px',
      mono: true
    }, {
      t: 'Item name'
    }, {
      t: 'Exp qty',
      w: '72px',
      align: 'right',
      mono: true
    }, {
      t: 'UoM',
      w: '58px'
    }, {
      t: 'Status',
      w: '88px',
      align: 'right'
    }],
    rows: [{
      state: 'ok',
      cells: ['1', 'SKU-049281-NV', 'Navigator backpack 30L', {
        t: '600',
        b: true
      }, 'each', {
        pill: 'success',
        t: 'ready'
      }]
    }, {
      state: 'ok',
      cells: ['2', 'SKU-051104-TR', 'Trail bottle 750ml — slate', {
        t: '240',
        b: true
      }, 'case', {
        pill: 'success',
        t: 'ready'
      }]
    }, {
      state: 'error',
      cells: ['3', {
        t: 'SKU-0773?',
        bad: true
      }, 'Ascent jacket M', {
        t: '120',
        b: true
      }, 'each', {
        pill: 'danger',
        t: 'error'
      }],
      fix: 'SKU not found in inventory — resolve to an existing item or create it.',
      action: 'Resolve item',
      actionIcon: 'link'
    }, {
      state: 'error',
      cells: ['4', 'SKU-062013-AS', 'Summit gloves L', {
        t: '12a',
        bad: true
      }, 'each', {
        pill: 'danger',
        t: 'error'
      }],
      fix: 'Expected quantity “12a” is not a whole number.',
      action: 'Fix value',
      actionIcon: 'pencil'
    }, {
      state: 'warning',
      cells: ['5', 'SKU-088420-CP', 'Camp pillow', {
        t: '80',
        b: true
      }, 'each', {
        pill: 'warning',
        t: 'check'
      }],
      fix: 'Expiry “01/03/27” is ambiguous — read as 1 Mar 2027 (DD/MM/YY).',
      action: 'Confirm',
      actionIcon: 'check'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "check"
  }, /*#__PURE__*/React.createElement("span", null, "Confirm 248 lines & create Job")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Disabled until 3 errors are cleared")))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "supervisor",
    title: "Pick up the Job & assign its tasks",
    note: "The confirmed file spawns a Job in the unassigned queue. A supervisor self-assigns it, then routes each task to a person (only they see it) or a department (everyone in it sees it). System tasks need no one.",
    transitions: [{
      label: 'jobs.status',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'info',
        t: 'assigned'
      }, {
        k: 'brand',
        t: 'in_progress'
      }]
    }, {
      label: 'job_tasks.status',
      steps: [{
        k: 'warning',
        t: 'pending'
      }, {
        k: 'info',
        t: 'assigned'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Jobs \xB7 JOB-2042",
    title: "Northwind Traders \xB7 Bonded Import",
    w: 560
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "brand",
    mono: true
  }, "248 lines"), /*#__PURE__*/React.createElement(Pill, {
    kind: "warning",
    mono: true
  }, "priority: high"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Due Jun 16 \xB7 W-02 Tuas"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "user-check"
  }, "Assigned to you"))), /*#__PURE__*/React.createElement(StepRail, {
    items: [{
      label: 'Unloading',
      status: 'active',
      tag: 'work',
      sub: 'Inbound crew · 3 users',
      subMono: false
    }, {
      label: 'Customs docs',
      status: 'pending',
      tag: 'file_collection',
      sub: 'Compliance dept'
    }, {
      label: 'Record quantities',
      status: 'pending',
      tag: 'prebuilt',
      sub: 'Assigned · Sam O.'
    }, {
      label: 'Update inventory',
      status: 'system',
      tag: 'system',
      sub: 'Auto — no assignee'
    }, {
      label: 'Generate GRN',
      status: 'system',
      tag: 'system',
      sub: 'Auto — no assignee'
    }, {
      label: 'Supervisor sign-off',
      status: 'pending',
      tag: 'approval',
      sub: 'Supervisor'
    }]
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "operator",
    title: "Work the manual steps \u2014 docs & put-away",
    note: "A file_collection step gates the flow on customs paperwork. A put-away work step fans out into one task per destination zone, each auto-assigned to that zone's put-away team \u2014 the step closes only when every zone task is done.",
    transition: {
      label: 'job_tasks.status',
      steps: [{
        k: 'info',
        t: 'in_progress'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2042 \xB7 Step 2",
    title: "Customs docs",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      border: '1px solid var(--success-border)',
      borderRadius: 6,
      padding: '8px 10px',
      background: 'var(--success-bg)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 15,
      height: 15,
      color: '#16A34A',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Customs Declaration Form"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#166534'
    }
  }, "customs-decl-NW2042.pdf \xB7 mandatory"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      border: '1.5px dashed var(--border-default)',
      borderRadius: 6,
      padding: '8px 10px',
      background: 'var(--slate-25)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "upload",
    style: {
      width: 15,
      height: 15,
      color: 'var(--fg-muted)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "Duty Payment Receipt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)'
    }
  }, "mandatory \xB7 not uploaded")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "warning",
    icon: "lock",
    title: "Step locked"
  }, "All mandatory documents must be uploaded before this step completes."))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2042 \xB7 Step 1",
    title: "Put-away \u2014 fanned by zone",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Zone',
      w: '108px'
    }, {
      t: 'Items',
      align: 'right',
      w: '54px',
      mono: true
    }, {
      t: 'Team',
      w: '92px'
    }, {
      t: 'Status',
      align: 'right',
      w: '78px'
    }],
    rows: [['Storage A', {
      t: '218',
      b: true
    }, 'Crew A', {
      pill: 'success',
      t: 'done'
    }], ['Cold', {
      t: '24',
      b: true
    }, 'Crew B', {
      pill: 'info',
      t: 'active'
    }], ['Bonded', {
      t: '6',
      b: true
    }, '—', {
      pill: 'muted',
      t: 'pending'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "split",
    title: "1 step \u2192 3 zone tasks"
  }, "Same flow_step_id, different zone_id. Completes when all three are done."))))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actors: ['operator', 'supervisor'],
    title: "Record received quantities \u2014 variance branches",
    note: "The record_quantities prebuilt step shows each storage-list line; the operator keys what physically arrived. Stoqr computes received \u2212 expected. A match auto-approves; any short or over delivery is held for a supervisor with receiving:approve."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2042 \xB7 Step 3",
    title: "Record quantities",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: 'SKU',
      mono: true,
      w: '150px'
    }, {
      t: 'Expected',
      align: 'right',
      w: '78px',
      mono: true
    }, {
      t: 'Received',
      align: 'right',
      w: '80px',
      mono: true
    }, {
      t: 'Variance',
      align: 'right',
      w: '80px',
      mono: true
    }, {
      t: 'Status',
      w: '96px',
      align: 'right'
    }],
    rows: [['SKU-049281-NV', {
      t: '600'
    }, {
      t: '600',
      b: true
    }, {
      t: '—',
      c: '#94A3B8'
    }, {
      pill: 'success',
      t: 'match'
    }], {
      __sel: true,
      cells: ['SKU-051104-TR', {
        t: '240'
      }, {
        t: '232',
        b: true
      }, {
        t: '−8',
        b: true,
        c: '#DC2626'
      }, {
        pill: 'warning',
        t: 'short'
      }]
    }, ['SKU-062013-AS', {
      t: '120'
    }, {
      t: '124',
      b: true
    }, {
      t: '+4',
      b: true,
      c: '#D97706'
    }, {
      pill: 'warning',
      t: 'over'
    }]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Variance = 0 \u2192 auto"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Received matches expected. The line auto-approves and proceeds to the system steps \u2014 no sign-off."), /*#__PURE__*/React.createElement(Transition, {
    label: "line",
    steps: [{
      k: 'muted',
      t: 'none',
      dot: false
    }, {
      k: 'success',
      t: 'approved'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "warning",
    label: "Short / over \u2192 approval"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Discrepancy held for a supervisor. They approve the variance (or send for recount) before inventory updates."), /*#__PURE__*/React.createElement(Transition, {
    label: "variance_status",
    steps: [{
      k: 'warning',
      t: 'short'
    }, {
      k: 'info',
      t: 'pending_approval'
    }, {
      k: 'success',
      t: 'approved'
    }]
  }))))), /*#__PURE__*/React.createElement(Step, {
    n: 8,
    actor: "system",
    title: "System steps run: inventory + GRN",
    note: "With quantities approved, the two system steps fire automatically. update_inventory writes stock and mints anti-theft QR codes; generate_grn produces one Goods Received Note per Job. No human touches either.",
    transitions: [{
      label: 'inventory_stocks.status',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'success',
        t: 'available'
      }]
    }, {
      label: 'goods_received_notes.status',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'success',
        t: 'accepted'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,0.95fr) minmax(0,1.05fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "System run",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'update_inventory',
      status: 'done',
      tag: 'system',
      sub: '+956 units · 3 stock rows · QR minted',
      subMono: false
    }, {
      label: 'generate_grn',
      status: 'done',
      tag: 'system',
      sub: 'GRN-5567 created (1 per Job)'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "qr-code"
  }, "Each inventory_stocks row carries its own anti-theft QR for downstream picks and counts."))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "GRN",
    title: "GRN-5567",
    w: "100%"
  }, /*#__PURE__*/React.createElement(KV, {
    k: "Job",
    v: "JOB-2042",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Client",
    v: "Northwind Traders"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Warehouse",
    v: "W-02 \xB7 Tuas"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Lines accepted",
    v: "246 / 248",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Variances resolved",
    v: "2",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Status",
    v: "accepted",
    kind: "success",
    mono: true
  })))), /*#__PURE__*/React.createElement(Step, {
    n: 9,
    actors: ['supervisor', 'client'],
    last: true,
    title: "Sign-off \u2014 and the client sees it land",
    note: "The supervisor's approval step closes the Job. Throughout, the client has watched step-level progress in their portal; now it reads Stored, with the GRN available to view.",
    transition: {
      label: 'jobs.status',
      steps: [{
        k: 'brand',
        t: 'in_progress'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2042 \xB7 Step 6",
    title: "Supervisor sign-off",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 11
    }
  }, "All tasks complete \xB7 GRN-5567 issued \xB7 2 variances approved. Confirm to close the Job."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "success",
    icon: "check"
  }, "Approve & close"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "rotate-ccw"
  }, "Reject & reopen")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "info"
  }, "Reject requires a reason and reopens the flagged step \u2014 the Job pauses, owner is notified."))), /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Inbound \xB7 JOB-2042",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Job created',
      status: 'done',
      sub: 'Jun 14, 9:02 AM'
    }, {
      label: 'Unloading',
      status: 'done'
    }, {
      label: 'Receiving & checks',
      status: 'done'
    }, {
      label: 'Stored',
      status: 'active',
      sub: '246 units now on hand'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "file-text",
    full: true
  }, "View GRN-5567"))))));
}
window.Flow2 = Flow2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-2-inbound.jsx", error: String((e && e.message) || e) }); }

// flows/flow-3-outbound.jsx
try { (() => {
// Flow 3 — Outbound: pick, pack & dispatch
function Flow3() {
  const OUT_STAGES = [{
    key: 'uploaded',
    label: 'uploaded'
  }, {
    key: 'saved',
    label: 'saved'
  }, {
    key: 'queued',
    label: 'queued'
  }, {
    key: 'processing',
    label: 'processing'
  }, {
    key: 'job',
    label: 'job_created'
  }];
  return /*#__PURE__*/React.createElement(Flow, {
    n: "3",
    id: "flow-outbound",
    title: "Outbound \u2014 pick, pack & dispatch",
    subtitle: "The mirror of inbound. A client (or operator) imports a packing list \u2014 fulfillment items and whole storage units in one file \u2014 which becomes an outbound Job. Stock is allocated at pick with a FEFO/FIFO engine, fanned out by zone, then packed, deducted from inventory, and shipped on a dispatch note the client can track.",
    actors: ['client', 'operator', 'supervisor', 'system']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "client",
    title: "Import the packing list",
    note: "The client uploads a packing list straight from their portal \u2014 the same drag-drop importer, mapping and review as inbound, but with outbound fields. Each line is either an item line (SKU + quantity) or a storage-unit line (a whole pallet/unit to release). On confirm, an outbound Job is created for the tenant to pick up.",
    transition: {
      label: 'packing_list_files.status',
      steps: [{
        k: 'muted',
        t: 'uploaded',
        dot: false
      }, {
        k: 'brand',
        t: 'processing'
      }, {
        k: 'success',
        t: 'job_created'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,0.95fr) minmax(0,1.05fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "New release \xB7 upload",
    w: "100%"
  }, /*#__PURE__*/React.createElement(Dropzone, {
    state: "done",
    name: "northwind-release-0614.csv",
    size: "44 KB",
    rows: 36,
    type: "csv"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13
    }
  }, /*#__PURE__*/React.createElement(SLabel, null, "Pipeline")), /*#__PURE__*/React.createElement(ParsePipeline, {
    stages: OUT_STAGES,
    current: 4
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    title: "Review \u2014 36 lines \xB7 2 types",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Ln',
      w: '30px',
      mono: true,
      align: 'center'
    }, {
      t: 'Reference',
      mono: true
    }, {
      t: 'Type',
      w: '74px'
    }, {
      t: 'Qty',
      align: 'right',
      w: '50px',
      mono: true
    }],
    rows: [['1', 'SKU-049281-NV', {
      pill: 'neutral',
      t: 'item'
    }, {
      t: '120',
      b: true
    }], ['2', 'SKU-062013-AS', {
      pill: 'neutral',
      t: 'item'
    }, {
      t: '40',
      b: true
    }], ['3', 'SKU-088420-CP', {
      pill: 'neutral',
      t: 'item'
    }, {
      t: '60',
      b: true
    }], ['4', 'SU-PLT-0098', {
      pill: 'brand',
      t: 'unit'
    }, {
      t: '1',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "package-2",
    title: "Mixed lines"
  }, "Item lines run the pick/pack path; the storage-unit line is retrieved whole and ships as-is."))))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "supervisor",
    title: "Assign the Job & verify the order",
    note: "The Job lands in the outbound queue against an outbound flow. The supervisor self-assigns, sets carrier and requested ship date, then the verify step confirms the order before any stock is committed \u2014 allocation happens at pick, not now.",
    transitions: [{
      label: 'jobs.status',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'info',
        t: 'assigned'
      }, {
        k: 'brand',
        t: 'in_progress'
      }]
    }, {
      label: 'job_tasks.status',
      steps: [{
        k: 'warning',
        t: 'pending'
      }, {
        k: 'info',
        t: 'assigned'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Jobs \xB7 JOB-2051",
    title: "Northwind Traders \xB7 Standard Dispatch",
    w: 560
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "info",
    mono: true
  }, "outbound"), /*#__PURE__*/React.createElement(Pill, {
    kind: "warning",
    mono: true
  }, "priority: urgent"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Ship by Jun 15 \xB7 DHL Express")), /*#__PURE__*/React.createElement(StepRail, {
    items: [{
      label: 'Verify order',
      status: 'active',
      tag: 'work',
      sub: 'Dispatch desk'
    }, {
      label: 'Pick items',
      status: 'pending',
      tag: 'prebuilt',
      sub: 'Fans out by zone'
    }, {
      label: 'Pack items',
      status: 'pending',
      tag: 'prebuilt',
      sub: 'Packing dept'
    }, {
      label: 'Deduct inventory',
      status: 'system',
      tag: 'system',
      sub: 'Auto — no assignee'
    }, {
      label: 'Generate dispatch note',
      status: 'system',
      tag: 'system',
      sub: 'Auto — no assignee'
    }, {
      label: 'Supervisor sign-off',
      status: 'pending',
      tag: 'approval',
      sub: 'Supervisor'
    }]
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actors: ['system', 'operator'],
    title: "Pick \u2014 allocate, fan out by zone, scan to confirm",
    note: "When pick_items starts, the engine allocates stock per line \u2014 FEFO for expiry-tracked SKUs, FIFO otherwise \u2014 and fans the pick list into one task per source zone, ordered by location. Operators scan item QR + location QR to confirm each pick. A short pick flags the allocation needs_resource and re-sources from the next location.",
    transitions: [{
      label: 'stock_allocations.status',
      steps: [{
        k: 'muted',
        t: 'allocated',
        dot: false
      }, {
        k: 'brand',
        t: 'picked'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1.05fr) minmax(0,0.95fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2051 \xB7 Pick",
    title: "Allocation \xB7 FEFO",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Stock',
      mono: true,
      w: '124px'
    }, {
      t: 'Bin',
      mono: true,
      w: '96px'
    }, {
      t: 'Expiry',
      w: '78px',
      mono: true
    }, {
      t: 'Pick',
      align: 'right',
      w: '46px',
      mono: true
    }],
    rows: [{
      __sel: true,
      cells: ['ST-0049281-a', 'COLD-A-01', {
        t: '2026-09',
        c: '#DC2626'
      }, {
        t: '70',
        b: true
      }]
    }, ['ST-0049281-b', 'COLD-A-04', {
      t: '2027-01',
      c: 'var(--fg-tertiary)'
    }, {
      t: '50',
      b: true
    }], ['ST-0062013-a', 'A-12-03', {
      t: '—',
      c: '#94A3B8'
    }, {
      t: '40',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(SLabel, null, "Fanned pick tasks"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, [['Cold zone', 'TSK-001', '2 lines', 'active'], ['General zone', 'TSK-002', '1 line', 'pending'], ['Bonded zone', 'TSK-003', '1 unit', 'pending']].map(([z, t, n, s]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '6px 9px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "map-pin",
    style: {
      width: 13,
      height: 13,
      color: 'var(--fg-tertiary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600
    }
  }, z), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      color: 'var(--fg-muted)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg-tertiary)',
      marginLeft: 'auto'
    }
  }, n), /*#__PURE__*/React.createElement(Pill, {
    kind: s === 'active' ? 'info' : 'muted'
  }, s)))))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "TSK-001 \xB7 Cold zone",
    title: "Pick task",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, [['item QR', 'SKU-049281-NV', true], ['location QR', 'COLD-A-01', true]].map(([l, v, ok]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 10px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      background: 'var(--slate-50)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "scan-line",
    style: {
      width: 16,
      height: 16,
      color: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 12,
      fontWeight: 600
    }
  }, v)), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 15,
      height: 15,
      color: '#16A34A',
      marginLeft: 'auto'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 40,
      border: '1.5px solid #2563EB',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 19,
      fontWeight: 700
    }
  }, "70"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "of 70 units")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    full: true,
    icon: "check"
  }, "Confirm pick")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Full pick"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Scanned quantity matches the allocation. It moves picked and the zone task closes."), /*#__PURE__*/React.createElement(Transition, {
    label: "allocation",
    steps: [{
      k: 'muted',
      t: 'allocated',
      dot: false
    }, {
      k: 'success',
      t: 'picked'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "danger",
    label: "Short pick \u2192 re-source"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Not enough at the bin. The allocation is flagged, a correction row is written, and the shortfall re-sources from the next location as a new pick task."), /*#__PURE__*/React.createElement(Transition, {
    label: "allocation",
    steps: [{
      k: 'brand',
      t: 'picked (partial)'
    }, {
      k: 'danger',
      t: 'needs_resource'
    }, {
      k: 'info',
      t: 're-sourced'
    }]
  }))))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "operator",
    title: "Pack \u2014 build packages, scan in, ships-as-is",
    note: "Picked items converge at the staging zone. The operator creates packages, scans items into each, and records weight and dimensions. Kit components flagged needs_packaging must share a package. Storage units and oversized goods are marked ships-as-is \u2014 no package.",
    transition: {
      label: 'packing_list_lines.pack_status',
      steps: [{
        k: 'muted',
        t: 'pending',
        dot: false
      }, {
        k: 'brand',
        t: 'packing'
      }, {
        k: 'success',
        t: 'packed'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2051 \xB7 Pack",
    title: "Packages",
    w: 640
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 11px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "box",
    style: {
      width: 14,
      height: 14,
      color: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 700
    }
  }, "PKG-1 \xB7 carton"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10.5,
      color: 'var(--fg-tertiary)'
    }
  }, "8.4 kg \xB7 60\xD740\xD740")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10
    }
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Item',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '42px',
      mono: true
    }],
    rows: [['SKU-049281-NV', {
      t: '120',
      b: true
    }], ['SKU-088420-CP', {
      t: '60',
      b: true
    }]]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 11px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "box",
    style: {
      width: 14,
      height: 14,
      color: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 700
    }
  }, "PKG-2 \xB7 box"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10.5,
      color: 'var(--fg-tertiary)'
    }
  }, "3.1 kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10
    }
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Item',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '42px',
      mono: true
    }],
    rows: [['SKU-062013-AS', {
      t: '40',
      b: true
    }]]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      border: '1px dashed var(--border-default)',
      borderRadius: 8,
      padding: '9px 11px',
      background: 'var(--slate-25)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "forklift",
    style: {
      width: 15,
      height: 15,
      color: 'var(--fg-tertiary)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11.5,
      fontWeight: 600
    }
  }, "SU-PLT-0098"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)'
    }
  }, "storage unit")), /*#__PURE__*/React.createElement(Pill, {
    kind: "brand"
  }, "ships as-is")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "check"
  }, "All lines packed \u2014 continue")))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "system",
    title: "System: deduct inventory",
    note: "deduct_inventory fires automatically. Picked quantities come off quantity_on_hand, the fulfilled allocations move picked \u2192 shipped (the rollup drops), the storage unit flips to shipped_out, and stock movements are written for the audit trail.",
    transitions: [{
      label: 'stock_allocations.status',
      steps: [{
        k: 'brand',
        t: 'picked'
      }, {
        k: 'success',
        t: 'shipped'
      }]
    }, {
      label: 'storage_units.status',
      steps: [{
        k: 'info',
        t: 'staged'
      }, {
        k: 'neutral',
        t: 'shipped_out'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "System run \xB7 deduct_inventory",
    w: 560
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Deduct on-hand',
      status: 'done',
      tag: 'system',
      sub: '−220 units across 3 stock rows',
      subMono: false
    }, {
      label: 'Allocations → shipped',
      status: 'done',
      tag: 'system',
      sub: 'quantity_allocated rollup drops'
    }, {
      label: 'Storage unit → shipped_out',
      status: 'done',
      tag: 'system',
      sub: 'SU-PLT-0098 · location cleared'
    }, {
      label: 'Stock movements written',
      status: 'done',
      tag: 'system',
      sub: 'type: ship · QR retained for audit'
    }]
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "system",
    title: "System: generate dispatch note",
    note: "generate_dispatch_note assembles the shipment record \u2014 items and units shipped, packages, carrier, tracking and destination \u2014 and publishes it to the client portal.",
    transition: {
      label: 'dispatch_notes.status',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'info',
        t: 'shipped'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Dispatch notes",
    title: "DN-3320",
    w: 560
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "1fr 1fr"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KV, {
    k: "Job",
    v: "JOB-2051",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Client",
    v: "Northwind Traders"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Carrier",
    v: "DHL Express"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Tracking",
    v: "JD0149820SG",
    mono: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KV, {
    k: "Packages",
    v: "2 + 1 unit",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Total weight",
    v: "11.5 kg",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Destination",
    v: "Northwind DC, SG"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Status",
    v: "shipped",
    kind: "info",
    mono: true
  }))))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actor: "supervisor",
    title: "Supervisor sign-off",
    note: "The final approval step closes the outbound Job. (An urgent-dispatch flow can omit sign-off to ship faster.)",
    transition: {
      label: 'jobs.status',
      steps: [{
        k: 'brand',
        t: 'in_progress'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2051 \xB7 Sign-off",
    title: "Confirm dispatch",
    w: 520
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 11
    }
  }, "All items picked, packed and deducted \xB7 DN-3320 issued with tracking. Close the Job."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "success",
    icon: "check"
  }, "Approve & close"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "rotate-ccw"
  }, "Hold")))), /*#__PURE__*/React.createElement(Step, {
    n: 8,
    actor: "client",
    last: true,
    title: "Client tracks the shipment",
    note: "The client follows the same Job through their portal \u2014 picking, packing, shipped \u2014 and opens the dispatch note for the carrier and tracking number once it's out.",
    transition: {
      label: 'session',
      steps: [{
        k: 'info',
        t: 'portal'
      }, {
        k: 'success',
        t: 'tracking visible'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Outbound \xB7 JOB-2051",
    w: 620
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Order received',
      status: 'done',
      sub: 'Jun 14, 10:18 AM'
    }, {
      label: 'Picking',
      status: 'done'
    }, {
      label: 'Packing',
      status: 'done'
    }, {
      label: 'Shipped',
      status: 'active',
      sub: 'DN-3320 · DHL Express'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      padding: '10px 12px',
      background: 'var(--slate-25)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "truck",
    style: {
      width: 16,
      height: 16,
      color: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Tracking number"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 13,
      fontWeight: 600
    }
  }, "JD0149820SG")), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "external-link"
  }, "Track"))))));
}
window.Flow3 = Flow3;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-3-outbound.jsx", error: String((e && e.message) || e) }); }

// flows/flow-4-feed.jsx
try { (() => {
// Flow 4 — Client inventory display feed (daily import → portal mirror)
function Flow4() {
  const FEED_STAGES = [{
    key: 'uploaded',
    label: 'uploaded'
  }, {
    key: 'saved',
    label: 'saved'
  }, {
    key: 'queued',
    label: 'queued'
  }, {
    key: 'wiping',
    label: 'wiping_prev'
  }, {
    key: 'processing',
    label: 'processing'
  }, {
    key: 'active',
    label: 'active'
  }];
  return /*#__PURE__*/React.createElement(Flow, {
    n: "4",
    id: "flow-feed",
    title: "Client inventory display feed",
    subtitle: "The tenant's daily WMS export (RIO) uploaded into Stoqr purely to show clients their stock \u2014 replacing the file they email out every morning. It's a latest-only mirror: each upload parses first, then safely wipes yesterday's feed and reloads. Rows are stored verbatim for display and projected into the operational model so existing portal views just work.",
    actors: ['operator', 'system', 'client']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "operator",
    title: "Drop the daily inventory export",
    note: "One file holds the tenant's whole bonded inventory \u2014 many clients' rows together. The importer accepts the same Excel/CSV drag-drop. The raw file is retained in blob storage as the source of truth for the day.",
    transition: {
      label: 'client_inventory_snapshots.status',
      steps: [{
        k: 'muted',
        t: 'uploaded',
        dot: false
      }, {
        k: 'info',
        t: 'saved_to_storage'
      }, {
        k: 'info',
        t: 'queued'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Inventory feed",
    title: "Upload daily snapshot",
    w: 560
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "brand",
    mono: true
  }, "snapshot_date: 2026-06-14"), /*#__PURE__*/React.createElement(Pill, {
    kind: "info",
    mono: true
  }, "latest-only"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Replaces the file you email clients daily")), /*#__PURE__*/React.createElement(Dropzone, {
    state: "done",
    name: "RIO-bonded-inventory-2026-06-14.xlsx",
    size: "2.4 MB",
    rows: 4120,
    type: "xlsx"
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "operator",
    title: "Map columns \u2014 resolve, project, store, drop",
    note: "The RIO export carries far more than core inventory. Each column gets a disposition: Resolve (AcCode \u2192 client, SKU \u2192 item, auto-creating either), Core (projected into inventory_stocks / stock_allocations), Computed (derived, never stored), Snapshot (kept verbatim for display only), or Dropped. Saved per tenant as mapping_type = client_inventory_feed."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Feed \xB7 mapping",
    title: "Column disposition \u2014 RIO format",
    w: 700
  }, /*#__PURE__*/React.createElement(ColumnMap, {
    rows: [{
      col: '1',
      header: 'AcCode',
      sample: 'NW · Northwind',
      field: 'client_id',
      disp: 'resolve'
    }, {
      col: '2',
      header: 'SKUCode',
      sample: 'SKU-049281-NV',
      field: 'inventory_items.sku',
      disp: 'resolve'
    }, {
      col: '5',
      header: 'OnHandLHUQty',
      sample: '1,240',
      field: 'quantity_on_hand',
      disp: 'core'
    }, {
      col: '6',
      header: 'AllocatedLHUQty',
      sample: '122',
      field: 'allocation · allocated',
      disp: 'core'
    }, {
      col: '8',
      header: 'HeldLHUQty',
      sample: '0',
      field: 'allocation · on_hold',
      disp: 'core'
    }, {
      col: '9',
      header: 'AvailableLHUQty',
      sample: '1,118',
      field: 'quantity_available',
      disp: 'computed'
    }, {
      col: '32',
      header: 'Bonded Lot No',
      sample: 'BL-90412',
      field: 'snapshot.bonded_lot_no',
      disp: 'snapshot'
    }, {
      col: '3',
      header: 'Code2',
      sample: 'X-0098',
      field: '—',
      disp: 'dropped'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "layers",
    title: "Verbatim + projected"
  }, "Every kept column is stored as-is for display; a subset is also projected into core so portal inventory views work. Item-master fields (dims, weight, hs_code) are seeded on auto-create only.")))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "system",
    title: "Parse first, then wipe & reload \u2014 safely",
    note: "ClientInventoryFeedProcessorJob parses the whole file before touching live data. Only on a clean parse does it wipe the prior feed \u2014 scoped to the tenant's dedicated dummy feed location, so it can never delete real operational stock \u2014 then load the new rows fresh and mark the snapshot active. A bad file fails and leaves yesterday's feed intact.",
    transitions: [{
      label: 'snapshots.status',
      steps: [{
        k: 'info',
        t: 'queued'
      }, {
        k: 'warning',
        t: 'wiping_previous'
      }, {
        k: 'brand',
        t: 'processing'
      }, {
        k: 'success',
        t: 'active'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Feed \xB7 processor",
    title: "Refresh pipeline",
    w: 680
  }, /*#__PURE__*/React.createElement(ParsePipeline, {
    stages: FEED_STAGES,
    current: 5
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Parse 4,120 rows',
      status: 'done',
      tag: 'system',
      sub: 'Validated before any write',
      subMono: false
    }, {
      label: 'Resolve clients & items',
      status: 'done',
      tag: 'system',
      sub: 'AcCode → client · SKU → item · auto-create misses'
    }, {
      label: 'Wipe prior feed',
      status: 'done',
      tag: 'system',
      sub: 'Scoped to feed location → cascades feed allocations'
    }, {
      label: 'Dual-write',
      status: 'done',
      tag: 'system',
      sub: 'snapshot_rows (verbatim) + inventory_stocks + stock_allocations'
    }, {
      label: 'Mark active',
      status: 'done',
      tag: 'system',
      sub: 'One active snapshot at a time'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "success",
    icon: "shield-check",
    title: "Wipe is safe by design"
  }, "Feed stock lives in one dummy feed location \u2014 the wipe is location-scoped and runs only after a successful parse."), /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "git-merge",
    title: "Allocation projection"
  }, "Allocated \u2192 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "allocated"), ", Picked \u2192 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "picked"), ", Held \u2192 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11
    }
  }, "on_hold"), "; rows carry null job_id.")))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "system",
    title: "Client resolution \u2014 match, auto-create, or hold",
    note: "Each row's AcCode is matched to a client by name (no code field exists in the export \u2014 an accepted limitation). The three outcomes determine whether a row is visible, newly created, or parked for review."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Match found"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "AcCode resolves to an existing client. Rows attach to that client_id and show in their portal."), /*#__PURE__*/React.createElement(Transition, {
    label: "row.client_id",
    steps: [{
      k: 'success',
      t: 'resolved'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "brand",
    label: "No match \u2192 auto-create"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "New AcCode creates the client record. Portal access isn't automatic \u2014 the tenant issues a password manually if they ask."), /*#__PURE__*/React.createElement(Transition, {
    label: "clients",
    steps: [{
      k: 'muted',
      t: 'auto_created',
      dot: false
    }, {
      k: 'success',
      t: 'active'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "warning",
    label: "Ambiguous \u2192 review"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Name collisions or blanks are stored unmatched (null client_id) and surfaced for the tenant to reconcile."), /*#__PURE__*/React.createElement(Transition, {
    label: "row.client_id",
    steps: [{
      k: 'warning',
      t: 'unmatched'
    }, {
      k: 'info',
      t: 'review'
    }]
  })))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "client",
    title: "Client sees their live inventory",
    note: "The client opens the portal and sees only their own rows from the current active snapshot \u2014 scoped by client_id and the per-client visibility config. The view carries the full export richness: bonded lot, permit, GRN, ageing, weights, dimensions \u2014 with available computed on the fly."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Inventory \xB7 as of Jun 14",
    w: 720
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "success",
    mono: true
  }, "active snapshot"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "1,284 of your rows \xB7 refreshed 06:10 AM"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "download"
  }, "Export CSV"))), /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: 'SKU',
      mono: true,
      w: '128px'
    }, {
      t: 'Description'
    }, {
      t: 'On hand',
      align: 'right',
      w: '64px',
      mono: true
    }, {
      t: 'Alloc',
      align: 'right',
      w: '52px',
      mono: true
    }, {
      t: 'Avail',
      align: 'right',
      w: '58px',
      mono: true
    }, {
      t: 'Bonded lot',
      mono: true,
      w: '90px'
    }, {
      t: 'Ageing',
      align: 'right',
      w: '60px'
    }],
    rows: [['SKU-049281-NV', 'Navigator backpack 30L', {
      t: '1,240',
      b: true
    }, {
      t: '122'
    }, {
      t: '1,118',
      b: true,
      c: '#16A34A'
    }, 'BL-90412', {
      t: '34d'
    }], ['SKU-051104-TR', 'Trail bottle 750ml — slate', {
      t: '640',
      b: true
    }, {
      t: '0'
    }, {
      t: '640',
      b: true,
      c: '#16A34A'
    }, 'BL-90418', {
      t: '12d'
    }], ['SKU-062013-AS', 'Ascent jacket M', {
      t: '86',
      b: true
    }, {
      t: '80'
    }, {
      t: '6',
      b: true,
      c: '#D97706'
    }, 'BL-90402', {
      t: '88d'
    }], ['SKU-088420-CP', 'Camp pillow', {
      t: '300',
      b: true
    }, {
      t: '0'
    }, {
      t: '300',
      b: true,
      c: '#16A34A'
    }, 'BL-90421', {
      t: '5d'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "calculator",
    title: "Available is computed, never stored"
  }, "quantity_available = on_hand \u2212 allocated \u2212 picked \u2212 held, straight from the generated column.")))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actors: ['system', 'operator'],
    last: true,
    title: "Daily refresh & end-of-period teardown",
    note: "There's no day-to-day history \u2014 tomorrow's upload repeats the parse-then-wipe cycle, always leaving exactly one active snapshot. When the tenant ends a client's feed period, a teardown job clears the feed location and snapshot for good.",
    transitions: [{
      label: 'daily',
      steps: [{
        k: 'success',
        t: 'active (today)'
      }, {
        k: 'warning',
        t: 'wiped'
      }, {
        k: 'success',
        t: 'active (tomorrow)'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Feed \xB7 snapshots",
    title: "Refresh history",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Date',
      mono: true,
      w: '96px'
    }, {
      t: 'Rows',
      align: 'right',
      w: '60px',
      mono: true
    }, {
      t: 'Status',
      align: 'right',
      w: '78px'
    }],
    rows: [{
      __sel: true,
      cells: ['2026-06-14', {
        t: '4,120',
        b: true
      }, {
        pill: 'success',
        t: 'active'
      }]
    }, ['2026-06-13', {
      t: '4,098',
      c: 'var(--fg-muted)'
    }, {
      pill: 'muted',
      t: 'wiped'
    }], ['2026-06-12', {
      t: '4,090',
      c: 'var(--fg-muted)'
    }, {
      pill: 'muted',
      t: 'wiped'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "warning",
    icon: "history",
    title: "Latest-only"
  }, "No per-day history is retained \u2014 each load replaces the last."))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Teardown",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 11
    }
  }, "When the feed period ends, ClientInventoryFeedTeardownJob clears the dedicated feed location and the snapshot \u2014 the client's mirror is removed for good."), /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Stop daily feed',
      status: 'done',
      sub: 'Tenant sets end-date'
    }, {
      label: 'Clear feed location',
      status: 'done',
      tag: 'system',
      sub: 'inventory_stocks + feed allocations'
    }, {
      label: 'Drop snapshot',
      status: 'done',
      tag: 'system',
      sub: 'Mirror removed'
    }]
  })))));
}
window.Flow4 = Flow4;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-4-feed.jsx", error: String((e && e.message) || e) }); }

// flows/flow-5-requests.jsx
try { (() => {
// Flow 5 — Item requests, Purchase Orders & procurement chaining
function Flow5() {
  return /*#__PURE__*/React.createElement(Flow, {
    n: "5",
    id: "flow-requests",
    title: "Item requests \u2014 procure, PO & auto-chain",
    subtitle: "The third job type. A client asks the tenant to BUY goods from a supplier \u2014 not store their own (inbound) or release what's stored (outbound). Item requests run a fixed lifecycle rather than the configurable flow engine: a request drives a Purchase Order to a supplier, then auto-chains into an inbound Job when goods arrive and \u2014 if a ship date is set \u2014 an outbound Job to the client. One parent Job, up to two children.",
    actors: ['client', 'supervisor', 'operator', 'system']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "client",
    title: "Client submits an item request",
    note: "From the portal, the client lists what they need the tenant to procure \u2014 each line an item description (and SKU if known), a quantity and notes \u2014 sets urgency and a preferred delivery date, and optionally a ship-to address. Setting a ship-to address is the switch that later auto-creates an outbound Job. Large requests can be dropped in as Excel/CSV through the same importer instead.",
    transition: {
      label: 'item_requests.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'warning',
        t: 'requested'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "New item request",
    w: 640
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 9,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Urgency",
    value: "High",
    icon: "flame"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Preferred delivery",
    value: "2026-06-24",
    mono: true,
    icon: "calendar"
  })), /*#__PURE__*/React.createElement(SLabel, {
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: 'var(--fg-tertiary)'
      }
    }, "3 lines")
  }, "Requested items"), /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Ln',
      w: '28px',
      mono: true,
      align: 'center'
    }, {
      t: 'Item description'
    }, {
      t: 'SKU (if known)',
      w: '128px',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '48px',
      mono: true
    }],
    rows: [['1', 'Brake pads — Model X', 'BRK-X', {
      t: '50',
      b: true
    }], ['2', 'Oil filter — Type Y', '—', {
      t: '100',
      b: true
    }], ['3', 'Spark plugs Z', 'SPK-Z', {
      t: '200',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Ship-to address (optional)",
    value: "Northwind DC \xB7 14 Tuas Ave, SG",
    icon: "map-pin"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "send"
  }, "Submit request"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "upload"
  }, "Upload list instead"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      color: 'var(--fg-tertiary)'
    }
  }, "Tenant can also raise this on the client's behalf")))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "supervisor",
    title: "Supervisor picks it up & starts sourcing",
    note: "The request lands in the procurement queue. A supervisor self-assigns \u2014 only then can the tenant act on it \u2014 and moves it into sourcing while staff find a supplier. The whole lifecycle is fixed: requested \u2192 reviewing \u2192 sourcing \u2192 po_created \u2192 ordered \u2192 in_transit \u2192 received \u2192 stored \u2192 completed.",
    transitions: [{
      label: 'item_requests.status',
      steps: [{
        k: 'warning',
        t: 'requested'
      }, {
        k: 'info',
        t: 'reviewing'
      }, {
        k: 'brand',
        t: 'sourcing'
      }]
    }, {
      label: 'item_requests.assigned_to',
      steps: [{
        k: 'muted',
        t: 'null',
        dot: false
      }, {
        k: 'info',
        t: 'supervisor'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Item requests \xB7 IR-000042",
    title: "Northwind Traders \xB7 3 items",
    w: 560
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "brand",
    mono: true
  }, "item_request"), /*#__PURE__*/React.createElement(Pill, {
    kind: "warning",
    mono: true
  }, "urgency: high"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Deliver by Jun 24 \xB7 ship-to set"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "user-check"
  }, "Assigned to you"))), /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Requested',
      status: 'done',
      sub: 'Jun 15, 8:40 AM · client portal'
    }, {
      label: 'Reviewing',
      status: 'done',
      sub: 'Self-assigned'
    }, {
      label: 'Sourcing',
      status: 'active',
      sub: 'Finding a supplier for 3 items'
    }, {
      label: 'PO created',
      status: 'pending'
    }, {
      label: 'Ordered → received → stored',
      status: 'pending',
      sub: 'Then auto inbound / outbound Jobs'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "info",
    title: "Fixed lifecycle \u2014 not the flow engine"
  }, "Item requests don't run tenant-defined flow steps. Inbound/outbound Jobs they spawn do.")))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "operator",
    title: "Source from the supplier directory",
    note: "Each item maps to one or more suppliers in the directory, carrying that supplier's own SKU, unit cost, minimum order quantity and lead time. One can be flagged the preferred supplier for the item. Staff pick the supplier to buy from \u2014 none of this is ever visible to the client."
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Sourcing \xB7 Brake pads \u2014 Model X",
    title: "Suppliers for this item",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: 'Supplier'
    }, {
      t: 'Supplier SKU',
      w: '116px',
      mono: true
    }, {
      t: 'Unit cost',
      align: 'right',
      w: '88px',
      mono: true
    }, {
      t: 'MOQ',
      align: 'right',
      w: '52px',
      mono: true
    }, {
      t: 'Lead',
      align: 'right',
      w: '64px',
      mono: true
    }, {
      t: '',
      w: '92px',
      align: 'right'
    }],
    rows: [{
      __sel: true,
      cells: ['Apex Auto Parts', 'AP-BRKX-50', {
        t: '$4.20',
        b: true
      }, {
        t: '25'
      }, {
        t: '7 d',
        b: true
      }, {
        pill: 'success',
        t: 'preferred'
      }]
    }, ['Meridian Spares', 'MS-0091', {
      t: '$3.95',
      b: true
    }, {
      t: '100'
    }, {
      t: '21 d',
      b: true
    }, {
      t: '',
      c: 'transparent'
    }], ['Harbour Supply Co', 'HS-BX', {
      t: '$4.60',
      b: true
    }, {
      t: '10'
    }, {
      t: '4 d',
      b: true
    }, {
      t: '',
      c: 'transparent'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "file-plus"
  }, "Create PO \xB7 Apex Auto Parts"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Preferred \u2014 best lead time within MOQ")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "neutral",
    icon: "boxes",
    title: "New items get created here"
  }, "If a requested item isn't in the catalog yet, it's created during sourcing so the PO line can reference it.")))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "operator",
    title: "Raise the Purchase Order",
    note: "A PO is created against the selected supplier, its lines copied from the request lines at the supplier's costs. Payment terms and currency default from the supplier. The PO starts as a draft \u2014 totals computed, nothing sent yet \u2014 and links back to the request so the chain stays traceable.",
    transitions: [{
      label: 'item_requests.status',
      steps: [{
        k: 'brand',
        t: 'sourcing'
      }, {
        k: 'info',
        t: 'po_created'
      }]
    }, {
      label: 'purchase_orders.status',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Purchase orders \xB7 PO-000118",
    title: "Apex Auto Parts \xB7 draft",
    w: 640
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 11,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(KVInline, {
    k: "From request",
    v: "IR-000042"
  }), /*#__PURE__*/React.createElement(KVInline, {
    k: "Terms",
    v: "Net 30"
  }), /*#__PURE__*/React.createElement(KVInline, {
    k: "Currency",
    v: "USD"
  }), /*#__PURE__*/React.createElement(KVInline, {
    k: "ETA",
    v: "Jun 22"
  })), /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Item'
    }, {
      t: 'Supplier SKU',
      w: '110px',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '52px',
      mono: true
    }, {
      t: 'Unit',
      align: 'right',
      w: '64px',
      mono: true
    }, {
      t: 'Line total',
      align: 'right',
      w: '84px',
      mono: true
    }],
    rows: [['Brake pads — Model X', 'AP-BRKX-50', {
      t: '50',
      b: true
    }, {
      t: '$4.20'
    }, {
      t: '$210.00',
      b: true
    }], ['Oil filter — Type Y', 'AP-OF-Y', {
      t: '100',
      b: true
    }, {
      t: '$1.80'
    }, {
      t: '$180.00',
      b: true
    }], ['Spark plugs Z', 'AP-SPK-Z', {
      t: '200',
      b: true
    }, {
      t: '$0.95'
    }, {
      t: '$190.00',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    icon: "send"
  }, "Mark sent to supplier"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "pencil"
  }, "Edit lines"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    }
  }, "Total"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 17,
      fontWeight: 700
    }
  }, "$580.00"))))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actor: "operator",
    title: "Drive the PO to delivery",
    note: "The PO walks its own lifecycle \u2014 sent \u2192 acknowledged \u2192 shipped \u2192 delivered \u2014 each transition stamped with a timestamp. Sending and acknowledging happen outside Stoqr (email/phone); staff record each milestone. The client's portal mirrors this as plain-language status, with no PO number, supplier or cost shown.",
    transitions: [{
      label: 'purchase_orders.status',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }, {
        k: 'info',
        t: 'sent'
      }, {
        k: 'brand',
        t: 'acknowledged'
      }, {
        k: 'warning',
        t: 'shipped'
      }, {
        k: 'success',
        t: 'delivered'
      }]
    }, {
      label: 'item_requests.status',
      steps: [{
        k: 'info',
        t: 'ordered'
      }, {
        k: 'brand',
        t: 'in_transit'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,0.9fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "PO-000118",
    title: "Status timeline",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Sent to supplier',
      status: 'done',
      sub: 'Jun 15, 11:02 AM'
    }, {
      label: 'Acknowledged',
      status: 'done',
      sub: 'Jun 15, 4:30 PM'
    }, {
      label: 'Shipped',
      status: 'active',
      tag: 'in_transit',
      sub: 'ETA warehouse Jun 22'
    }, {
      label: 'Delivered',
      status: 'pending',
      sub: 'Triggers auto inbound Job'
    }]
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Request IR \xB7 status",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Submitted',
      status: 'done'
    }, {
      label: 'In progress',
      status: 'done'
    }, {
      label: 'Arriving Jun 22',
      status: 'active',
      sub: 'Expected delivery date'
    }, {
      label: 'Received',
      status: 'pending'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "muted",
    icon: "eye-off"
  }, "Client never sees supplier, PO number or costs \u2014 only simplified status."))))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "system",
    title: "Delivered \u2192 auto-create the inbound Job",
    note: "Marking the PO delivered fires PODeliveryAutoInboundJob: the system spawns an inbound Job on the tenant's default inbound flow, auto-populating its storage-list lines from the PO lines (expected quantities). That Job is linked as a child of the item-request Job, then runs the normal receiving / put-away flow from Flow 2.",
    transitions: [{
      label: 'purchase_orders.status',
      steps: [{
        k: 'success',
        t: 'delivered'
      }]
    }, {
      label: 'jobs (child)',
      steps: [{
        k: 'muted',
        t: 'created',
        dot: false
      }, {
        k: 'brand',
        t: 'in_progress'
      }]
    }, {
      label: 'item_requests.status',
      steps: [{
        k: 'brand',
        t: 'in_transit'
      }, {
        k: 'info',
        t: 'received'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Jobs \xB7 IR-000042",
    title: "Parent \u2192 child Jobs",
    w: 600
  }, /*#__PURE__*/React.createElement(JobTree, {
    parent: {
      id: 'JOB-2088',
      type: 'item_request',
      label: 'IR-000042 · Northwind procurement',
      status: 'brand',
      statusT: 'in_progress'
    },
    children: [{
      id: 'JOB-2089',
      type: 'inbound',
      label: 'Receiving from Apex PO-000118',
      status: 'brand',
      statusT: 'in_progress',
      note: 'Storage-list lines auto-filled from 3 PO lines'
    }, {
      id: '—',
      type: 'outbound',
      label: 'Dispatch to Northwind DC',
      status: 'muted',
      statusT: 'queued',
      note: 'Spawns after receiving — ship-to is set',
      ghost: true
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "cpu",
    title: "PODeliveryAutoInboundJob"
  }, "No operator action needed to create the inbound Job \u2014 receiving picks up where Flow 2 left off.")))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actor: "system",
    title: "Received & stored \u2014 then it branches",
    note: "When the inbound child Job completes, the goods are in inventory and the request reads stored. What happens next depends on whether the client set a ship-to address and ship date on the original request.",
    transition: {
      label: 'item_requests.status',
      steps: [{
        k: 'info',
        t: 'received'
      }, {
        k: 'brand',
        t: 'stored'
      }]
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "neutral",
    label: "No ship-to \u2192 hold in storage"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Goods stay on hand for the client, visible in their live inventory feed (Flow 4). The request completes once stored \u2014 no outbound Job."), /*#__PURE__*/React.createElement(Transition, {
    label: "request",
    steps: [{
      k: 'brand',
      t: 'stored'
    }, {
      k: 'success',
      t: 'completed'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Ship-to set \u2192 auto outbound"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "InboundCompleteAutoOutboundJob spawns an outbound child Job on the default outbound flow \u2014 packing-list lines from the received items. Its pick step creates stock_allocations like any dispatch."), /*#__PURE__*/React.createElement(Transition, {
    label: "job (child)",
    steps: [{
      k: 'muted',
      t: 'outbound created',
      dot: false
    }, {
      k: 'brand',
      t: 'in_progress'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "warning",
    icon: "undo-2",
    title: "Cancel releases reservations"
  }, "Cancelling a request or PO with an in-flight outbound child releases that Job's open stock_allocations \u2192 reserved stock frees up."))), /*#__PURE__*/React.createElement(Step, {
    n: 8,
    actors: ['system', 'client'],
    last: true,
    title: "Parent Job completes \u2014 client is notified",
    note: "The parent item-request Job auto-completes once all child Jobs finish. The client sees only the simplified arc \u2014 never the procurement detail underneath \u2014 and is notified the request is done.",
    transition: {
      label: 'item_requests.status',
      steps: [{
        k: 'brand',
        t: 'stored'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2088",
    title: "Parent rollup",
    w: "100%"
  }, /*#__PURE__*/React.createElement(JobTree, {
    parent: {
      id: 'JOB-2088',
      type: 'item_request',
      label: 'IR-000042 · Northwind procurement',
      status: 'success',
      statusT: 'completed'
    },
    children: [{
      id: 'JOB-2089',
      type: 'inbound',
      label: 'Receiving from Apex',
      status: 'success',
      statusT: 'completed'
    }, {
      id: 'JOB-2091',
      type: 'outbound',
      label: 'Dispatch to Northwind DC',
      status: 'success',
      statusT: 'completed',
      note: 'DN-3344 · DHL Express'
    }]
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Request IR \xB7 completed",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Submitted',
      status: 'done'
    }, {
      label: 'In progress',
      status: 'done'
    }, {
      label: 'Received',
      status: 'done'
    }, {
      label: 'Completed',
      status: 'active',
      sub: 'Shipped to Northwind DC'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Toast, null, "Item request IR-000042 completed"))))));
}

// Small inline helpers for this flow
function KVInline({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '4px 9px',
      background: 'var(--slate-25)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11,
      fontWeight: 600
    }
  }, v));
}
function JobTree({
  parent,
  children
}) {
  const TYPE = {
    item_request: {
      c: '#2563EB',
      icon: 'git-merge',
      label: 'parent · item_request'
    },
    inbound: {
      c: '#0891B2',
      icon: 'corner-down-right',
      label: 'child · inbound'
    },
    outbound: {
      c: '#7C3AED',
      icon: 'corner-down-right',
      label: 'child · outbound'
    }
  };
  const Row = ({
    node,
    child
  }) => {
    const t = TYPE[node.type] || TYPE.item_request;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: `1px solid ${node.ghost ? 'var(--border-subtle)' : 'var(--border-default)'}`,
        borderRadius: 8,
        padding: '9px 11px',
        background: node.ghost ? 'var(--slate-25)' : '#fff',
        opacity: node.ghost ? 0.7 : 1,
        marginLeft: child ? 26 : 0
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": t.icon,
      style: {
        width: 15,
        height: 15,
        color: t.c,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono, monospace',
        fontSize: 12,
        fontWeight: 700
      }
    }, node.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: t.c,
        background: t.c + '14',
        padding: '1px 6px',
        borderRadius: 3
      }
    }, t.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--fg-secondary)',
        marginTop: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, node.label), node.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--fg-tertiary)',
        marginTop: 2
      }
    }, node.note)), /*#__PURE__*/React.createElement(Pill, {
      kind: node.status,
      mono: true
    }, node.statusT));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Row, {
    node: parent
  }), children.map((c, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    node: c,
    child: true
  })));
}
window.Flow5 = Flow5;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-5-requests.jsx", error: String((e && e.message) || e) }); }

// flows/flow-6-vessels.jsx
try { (() => {
// Flow 6 — Ship-spares: vessels, allocation & reserve-at-order
function Flow6() {
  return /*#__PURE__*/React.createElement(Flow, {
    n: "6",
    id: "flow-vessels",
    title: "Ship-spares \u2014 vessels & reserve-at-order",
    subtitle: "A maritime variant of storage. Shipping companies store spare parts tagged to specific vessels; when a vessel docks, parts are dispatched to it. It reuses the Job/Flow engine (a ship_spares flow type with customs document steps), and adds three things: a vessels register, a soft vessel-tag on stock, and shipping requests \u2014 vessel-scoped intake that reserves stock the moment an order exists, not at pick.",
    actors: ['admin', 'operator', 'client', 'system']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "admin",
    title: "Register the client's vessel",
    note: "Vessels belong to the client (the shipping company); a client can have many. Each is keyed by its 7-digit IMO number \u2014 unique per tenant \u2014 and carries flag state, type, and owner / manager / local-agent details for customs paperwork later.",
    transition: {
      label: 'vessels.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Clients \xB7 Pacific Lines \xB7 Vessels",
    title: "MV Pacific Star",
    w: 620
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 9,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "IMO number",
    value: "9412705",
    mono: true,
    icon: "hash"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Call sign",
    value: "9V2810",
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Flag state",
    value: "Singapore",
    icon: "flag"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Vessel type",
    value: "Container ship"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Gross tonnage",
    value: "74,000",
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Local agent",
    value: "Sembawang UEN"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "ship",
    title: "One register, many vessels"
  }, "Operators allocate stock and raise shipping requests against a vessel by IMO \u2014 it threads through every ship-spares Job.")))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "admin",
    title: "Build a ship_spares inbound flow",
    note: "ship_spares is a flow type alongside inbound and outbound. Customs compliance is handled entirely through ordinary flow steps \u2014 a mandatory-document step for each permit \u2014 so no special customs columns exist on Jobs or Items. The flow adds a vessel-allocation step that tags received parts to a vessel, and stores them in a bonded zone.",
    transition: {
      label: 'flows.flow_type',
      steps: [{
        k: 'brand',
        t: 'ship_spares',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Flows \xB7 Ship-spares inbound",
    title: "Vessel parts intake",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: '#',
      w: '26px',
      mono: true,
      align: 'center'
    }, {
      t: 'Step'
    }, {
      t: 'Type',
      w: '128px',
      mono: true
    }, {
      t: 'Doc / note',
      w: '150px'
    }],
    rows: [['1', 'Security check', 'work', {
      t: '—',
      c: 'var(--fg-muted)'
    }], ['2', 'Customs IN permit filing', {
      t: 'file · required',
      c: '#DC2626'
    }, {
      t: 'TradeNet IN Permit',
      c: 'var(--fg-secondary)'
    }], ['3', 'Unloading + inspection', 'work', {
      t: '—',
      c: 'var(--fg-muted)'
    }], ['4', 'Record quantities', 'prebuilt', {
      t: 'record_quantities',
      c: 'var(--fg-tertiary)'
    }], ['5', 'Vessel allocation', {
      t: 'work',
      c: '#0891B2'
    }, {
      t: 'tag parts → vessel',
      c: 'var(--fg-secondary)'
    }], ['6', 'Update inventory', {
      t: 'system',
      c: '#7C3AED',
      b: true
    }, {
      t: 'bonded zone',
      c: 'var(--fg-tertiary)'
    }], ['7', 'Generate GRN', {
      t: 'system',
      c: '#7C3AED',
      b: true
    }, {
      t: 'auto',
      c: 'var(--fg-muted)'
    }], ['8', 'Supervisor sign-off', 'approval', {
      t: '—',
      c: 'var(--fg-muted)'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "neutral",
    icon: "shield-check",
    title: "Bonded = zone + Job, not a flag"
  }, "Bonded stock is identified by its zone_type and the customs docs attached to the incoming Job \u2014 no special bonded column on stock.")))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "operator",
    title: "Tag received parts to a vessel",
    note: "At the vessel-allocation step the operator soft-tags stock to a vessel \u2014 \u201Cthese 20 engine filters are reserved for MV Pacific Star.\u201D This is a standing tag (parts can sit vessel-tagged for months) that does NOT touch quantity_allocated \u2014 vessel-tagged parts still read available until a real order exists. Distinct from the order-allocation ledger.",
    transitions: [{
      label: 'inventory_stocks.vessel_id',
      steps: [{
        k: 'muted',
        t: 'null',
        dot: false
      }, {
        k: 'info',
        t: 'MV Pacific Star'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2102 \xB7 Step 5",
    title: "Vessel allocation",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Stock',
      mono: true,
      w: '128px'
    }, {
      t: 'Part',
      w: '150px'
    }, {
      t: 'Zone',
      w: '92px'
    }, {
      t: 'Qty',
      align: 'right',
      w: '46px',
      mono: true
    }, {
      t: 'Vessel tag',
      w: '120px',
      align: 'right'
    }],
    rows: [['ST-0091233-a', 'Engine filter EF-7', {
      t: 'Bonded-A',
      c: '#854D0E'
    }, {
      t: '20',
      b: true
    }, {
      pill: 'info',
      t: 'Pacific Star'
    }], ['ST-0091240-a', 'Fuel injector FI-3', {
      t: 'Bonded-A',
      c: '#854D0E'
    }, {
      t: '8',
      b: true
    }, {
      pill: 'info',
      t: 'Pacific Star'
    }], ['ST-0091255-a', 'Gasket set GS-9', {
      t: 'Bonded-B',
      c: '#854D0E'
    }, {
      t: '40',
      b: true
    }, {
      pill: 'muted',
      t: 'unallocated'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "info",
    label: "Vessel allocation \u2014 standing soft tag"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5
    }
  }, "inventory_stocks.vessel_id. Long-lived, reallocatable, no order needed. ", /*#__PURE__*/React.createElement("strong", null, "Does not"), " reduce available stock.")), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "brand",
    label: "Order allocation \u2014 the Phase 3 ledger"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5
    }
  }, "stock_allocations. Created only when there's a real order. ", /*#__PURE__*/React.createElement("strong", null, "Does"), " reduce available stock.")))))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "client",
    title: "Client raises a shipping request for the vessel",
    note: "Ship-spares outbound starts from a shipping request \u2014 a vessel-scoped ask (\u201Csend these spares to MV Pacific Star when she docks\u201D), not a generic packing-list upload. Capturing the vessel up front is exactly what makes reserve-at-order possible: the engine knows whose tagged stock to reserve.",
    transition: {
      label: 'shipping_requests.status',
      steps: [{
        k: 'muted',
        t: 'new',
        dot: false
      }, {
        k: 'warning',
        t: 'submitted'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Pacific Lines",
    title: "New shipping request \xB7 SR-000071",
    w: 600
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 9,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Vessel",
    value: "MV Pacific Star \xB7 IMO 9412705",
    icon: "ship"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Expected dock date",
    value: "2026-06-20",
    mono: true,
    icon: "calendar"
  })), /*#__PURE__*/React.createElement(SLabel, null, "Requested spares"), /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Ln',
      w: '28px',
      mono: true,
      align: 'center'
    }, {
      t: 'Part',
      mono: true
    }, {
      t: 'Name',
      w: '150px'
    }, {
      t: 'Qty',
      align: 'right',
      w: '48px',
      mono: true
    }],
    rows: [['1', 'EF-7', 'Engine filter', {
      t: '12',
      b: true
    }], ['2', 'FI-3', 'Fuel injector', {
      t: '6',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "anchor"
  }, "The request targets one vessel \u2014 its tagged stock is what gets reserved on confirm.")))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actors: ['operator', 'system'],
    title: "Confirm \u2192 spawn the Job & reserve-at-order",
    note: "The tenant accepts, then confirms the request. Confirmation creates an outbound Job on the ship_spares flow (packing-list lines from the request) AND \u2014 unlike general outbound, which allocates at pick \u2014 immediately writes stock_allocations with status reserved against the vessel's tagged stock. quantity_allocated rises, quantity_available drops: the parts no longer show as available to any other order.",
    transitions: [{
      label: 'shipping_requests.status',
      steps: [{
        k: 'warning',
        t: 'submitted'
      }, {
        k: 'info',
        t: 'accepted'
      }, {
        k: 'brand',
        t: 'job_created'
      }]
    }, {
      label: 'stock_allocations.status',
      steps: [{
        k: 'muted',
        t: 'none',
        dot: false
      }, {
        k: 'warning',
        t: 'reserved'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "SR-000071",
    title: "Confirm shipping request",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 11
    }
  }, "Accepting spawns JOB-2118 (ship_spares outbound) and reserves the vessel's tagged stock now \u2014 at order, not at pick."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "success",
    icon: "check"
  }, "Accept & confirm"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    icon: "x"
  }, "Reject")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "warning",
    icon: "lock",
    title: "Shortfall flagged like any short allocation"
  }, "If the vessel's tagged stock can't cover the request, the gap is raised at reserve time."))), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Reserve-at-order \xB7 stock",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Stock',
      mono: true,
      w: '120px'
    }, {
      t: 'On hand',
      align: 'right',
      w: '64px',
      mono: true
    }, {
      t: 'Reserved',
      align: 'right',
      w: '70px',
      mono: true
    }, {
      t: 'Avail',
      align: 'right',
      w: '56px',
      mono: true
    }],
    rows: [{
      __sel: true,
      cells: ['ST-0091233-a', {
        t: '20'
      }, {
        t: '12',
        b: true,
        c: '#D97706'
      }, {
        t: '8',
        b: true
      }]
    }, {
      __sel: true,
      cells: ['ST-0091240-a', {
        t: '8'
      }, {
        t: '6',
        b: true,
        c: '#D97706'
      }, {
        t: '2',
        b: true
      }]
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "git-commit-horizontal"
  }, "Reserved rows carry job_id from creation; quantity_available already reflects the hold."))))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actor: "operator",
    title: "Run the outbound \u2014 customs gates & pick",
    note: "The ship_spares outbound flow runs pick \u2192 pack \u2192 dispatch with customs steps interleaved: a TradeNet OUT permit before picking and a Ship Stores Declaration before deduction, each a mandatory-document step. At pick_items, each reserved allocation becomes allocated, then picked \u2014 the reservation made at order is now realised.",
    transitions: [{
      label: 'stock_allocations.status',
      steps: [{
        k: 'warning',
        t: 'reserved'
      }, {
        k: 'info',
        t: 'allocated'
      }, {
        k: 'brand',
        t: 'picked'
      }, {
        k: 'success',
        t: 'shipped'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,0.95fr) minmax(0,1.05fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2118 \xB7 ship_spares outbound",
    title: "Flow steps",
    w: "100%"
  }, /*#__PURE__*/React.createElement(StepRail, {
    compact: true,
    items: [{
      label: 'Verify release request',
      status: 'done',
      tag: 'work'
    }, {
      label: 'File TradeNet OUT permit',
      status: 'done',
      tag: 'file',
      sub: 'tradenet-out-2118.pdf'
    }, {
      label: 'Pick items',
      status: 'active',
      tag: 'prebuilt',
      sub: 'reserved → allocated → picked'
    }, {
      label: 'Pack items',
      status: 'pending',
      tag: 'prebuilt'
    }, {
      label: 'Ship Stores Declaration',
      status: 'pending',
      tag: 'file',
      sub: 'mandatory before deduct'
    }, {
      label: 'Deduct inventory · GRN',
      status: 'pending',
      tag: 'system'
    }]
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "JOB-2118 \xB7 Pick",
    title: "Reserved \u2192 allocated \u2192 picked",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Stock',
      mono: true,
      w: '116px'
    }, {
      t: 'Bin',
      mono: true,
      w: '92px'
    }, {
      t: 'Qty',
      align: 'right',
      w: '44px',
      mono: true
    }, {
      t: 'Status',
      align: 'right',
      w: '82px'
    }],
    rows: [['ST-0091233-a', 'BND-A-02', {
      t: '12',
      b: true
    }, {
      pill: 'brand',
      t: 'picked'
    }], {
      __sel: true,
      cells: ['ST-0091240-a', 'BND-A-05', {
        t: '6',
        b: true
      }, {
        pill: 'info',
        t: 'allocated'
      }]
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "brand",
    icon: "scan-line"
  }, "Same scan-to-confirm pick as Flow 3 \u2014 the rows just started life reserved rather than fresh."))))), /*#__PURE__*/React.createElement(Step, {
    n: 7,
    actors: ['system', 'client'],
    last: true,
    title: "Dispatched to the vessel \u2014 client sees its parts",
    note: "System steps deduct inventory and issue the dispatch note; the request rides the Job to shipped \u2192 completed. The client's portal shows their vessels and the parts stored against each \u2014 but never the internal customs documents.",
    transitions: [{
      label: 'shipping_requests.status',
      steps: [{
        k: 'brand',
        t: 'in_progress'
      }, {
        k: 'warning',
        t: 'shipped'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,0.9fr) minmax(0,1.1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Dispatch notes",
    title: "DN-3360 \xB7 to vessel",
    w: "100%"
  }, /*#__PURE__*/React.createElement(KV, {
    k: "Job",
    v: "JOB-2118",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Vessel",
    v: "MV Pacific Star"
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Request",
    v: "SR-000071",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Parts shipped",
    v: "18 units",
    mono: true
  }), /*#__PURE__*/React.createElement(KV, {
    k: "Status",
    v: "shipped",
    kind: "success",
    mono: true
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Pacific Lines",
    title: "MV Pacific Star \xB7 stored parts",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Part',
      mono: true
    }, {
      t: 'Name',
      w: '140px'
    }, {
      t: 'On hand',
      align: 'right',
      w: '64px',
      mono: true
    }, {
      t: '',
      w: '78px',
      align: 'right'
    }],
    rows: [['EF-7', 'Engine filter', {
      t: '8',
      b: true
    }, {
      pill: 'success',
      t: 'stored'
    }], ['FI-3', 'Fuel injector', {
      t: '2',
      b: true
    }, {
      pill: 'success',
      t: 'stored'
    }], ['GS-9', 'Gasket set', {
      t: '40',
      b: true
    }, {
      pill: 'muted',
      t: 'untagged'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "muted",
    icon: "eye-off"
  }, "Customs permits & declarations are internal workflow docs \u2014 not shown to the client."))))));
}
window.Flow6 = Flow6;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-6-vessels.jsx", error: String((e && e.message) || e) }); }

// flows/flow-7-billing.jsx
try { (() => {
// Flow 7 — Billing, invoicing & corrections
function Flow7() {
  return /*#__PURE__*/React.createElement(Flow, {
    n: "7",
    id: "flow-billing",
    title: "Billing \u2014 charges, invoices & corrections",
    subtitle: "The financial backbone. Two streams accrue charges: job billing (per billable step, by charge type) and storage billing (per daily inventory snapshot). Both debit a wallet. A nightly scheduler aggregates everything due into one invoice per billing cycle, generates a PDF, and ages it to overdue. Records are immutable \u2014 corrections are additive adjustments applied to the next invoice.",
    actors: ['admin', 'system', 'operator', 'client']
  }, /*#__PURE__*/React.createElement(Step, {
    n: 1,
    actor: "admin",
    title: "Configure the rate cards",
    note: "Pricing lives in two configs, settable per tenant and overridable per client. step_billing_config prices billable flow steps by charge type (JOB / ITEM / PALLET / CONTAINER). storage_billing_config prices storage per unit (PALLET / BIN / CONTAINER), split by general vs spare-parts \u2014 only spare parts get free_days grace. Prices are snapshotted at billing time, so later changes never alter past records.",
    transition: {
      label: 'config.is_active',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }, {
        k: 'success',
        t: 'active'
      }]
    }
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1fr) minmax(0,1fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Billing \xB7 Rate cards",
    title: "Step billing (job)",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Step',
      w: '120px'
    }, {
      t: 'Charge',
      w: '78px',
      mono: true
    }, {
      t: 'Type',
      w: '78px'
    }, {
      t: 'Unit price',
      align: 'right',
      w: '78px',
      mono: true
    }],
    rows: [['Record qty', 'ITEM', 'inbound', {
      t: '$0.12',
      b: true
    }], ['Generate GRN', 'JOB', 'inbound', {
      t: '$8.00',
      b: true
    }], ['Pick items', 'ITEM', 'outbound', {
      t: '$0.15',
      b: true
    }], ['Pack items', 'CONTAINER', 'outbound', {
      t: '$1.20',
      b: true
    }]]
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    title: "Storage billing",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Applies to',
      w: '108px'
    }, {
      t: 'Charge',
      w: '74px',
      mono: true
    }, {
      t: 'Free days',
      align: 'right',
      w: '74px',
      mono: true
    }, {
      t: 'Per day',
      align: 'right',
      w: '70px',
      mono: true
    }],
    rows: [['General', 'PALLET', {
      t: '0',
      c: '#94A3B8'
    }, {
      t: '$0.90',
      b: true
    }], ['General', 'BIN', {
      t: '0',
      c: '#94A3B8'
    }, {
      t: '$0.30',
      b: true
    }], ['Spare parts', 'PALLET', {
      t: '14',
      b: true,
      c: '#16A34A'
    }, {
      t: '$1.10',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "lock",
    title: "Pricing snapshot"
  }, "Unit prices are copied onto each billing line at billing time \u2014 immutable thereafter."))))), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    actor: "system",
    title: "Job charges accrue as steps complete",
    note: "As each billable step finishes, the system resolves its price, computes quantity by charge type \u2014 PICK sums item quantities, PACK counts containers, DISPATCH is a fixed job count \u2014 and writes a line item. On job completion the lines aggregate into one job_billing record (UNIQUE per job, preventing duplicates) and debit the wallet.",
    transitions: [{
      label: 'job_billing.status',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }, {
        k: 'success',
        t: 'finalized'
      }]
    }, {
      label: 'wallet_transactions',
      steps: [{
        k: 'muted',
        t: 'pending',
        dot: false
      }, {
        k: 'danger',
        t: 'debit',
        dot: true
      }, {
        k: 'success',
        t: 'confirmed'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Billing \xB7 JOB-2051",
    title: "Job billing rollup",
    w: 620
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Step',
      w: '128px'
    }, {
      t: 'Charge',
      w: '76px',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '52px',
      mono: true
    }, {
      t: 'Unit',
      align: 'right',
      w: '62px',
      mono: true
    }, {
      t: 'Amount',
      align: 'right',
      w: '78px',
      mono: true
    }],
    rows: [['Pick items', 'ITEM', {
      t: '220',
      b: true
    }, {
      t: '$0.15'
    }, {
      t: '$33.00',
      b: true
    }], ['Pack items', 'CONTAINER', {
      t: '2',
      b: true
    }, {
      t: '$1.20'
    }, {
      t: '$2.40',
      b: true
    }], ['Generate dispatch', 'JOB', {
      t: '1',
      b: true
    }, {
      t: '$6.00'
    }, {
      t: '$6.00',
      b: true
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(KV2, {
    k: "job_billing total",
    v: "$41.40"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "success",
    mono: true
  }, "finalized")), /*#__PURE__*/React.createElement(Pill, {
    kind: "danger",
    mono: true
  }, "wallet \u2212$41.40")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "neutral",
    icon: "shield",
    title: "Idempotent by construction"
  }, "UNIQUE(job_id) on job_billing and UNIQUE(source_type, source_id) on wallet transactions block double-billing.")))), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    actor: "system",
    title: "Nightly: capture the storage snapshot",
    note: "A daily cron (midnight) photographs inventory grouped by client, storage type and charge type, writing one inventory_snapshots row per group \u2014 guarded by a UNIQUE constraint so a retry can't double-count. These snapshots are what storage billing sums over the cycle; general stock charges from day one, spare parts only after their free-day grace.",
    transitions: [{
      label: 'billing_job_runs',
      steps: [{
        k: 'info',
        t: 'started'
      }, {
        k: 'success',
        t: 'completed'
      }]
    }, {
      label: 'inventory_snapshots',
      steps: [{
        k: 'muted',
        t: 'none',
        dot: false
      }, {
        k: 'success',
        t: 'captured'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Scheduler \xB7 DailyStorageSnapshotJob",
    title: "2026-06-15 \xB7 snapshot",
    w: 600
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Client',
      w: '140px'
    }, {
      t: 'Storage',
      w: '100px'
    }, {
      t: 'Charge',
      w: '74px',
      mono: true
    }, {
      t: 'Qty',
      align: 'right',
      w: '52px',
      mono: true
    }, {
      t: 'Billable',
      align: 'right',
      w: '70px'
    }],
    rows: [['Northwind Traders', 'General', 'PALLET', {
      t: '34',
      b: true
    }, {
      pill: 'success',
      t: 'yes'
    }], ['Northwind Traders', 'General', 'BIN', {
      t: '120',
      b: true
    }, {
      pill: 'success',
      t: 'yes'
    }], ['Pacific Lines', 'Spare parts', 'PALLET', {
      t: '6',
      b: true
    }, {
      pill: 'warning',
      t: 'grace'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    kind: "info",
    icon: "repeat",
    title: "Retry-safe"
  }, "UNIQUE(client, snapshot_date, storage_type, charge_type) \u2014 re-running the night's job is a no-op.")))), /*#__PURE__*/React.createElement(Step, {
    n: 4,
    actor: "system",
    title: "Cycle processor builds the invoice",
    note: "A nightly processor checks each client's billing_cycle and billing_cycle_day against last_billing_date. When a cycle is due it gathers finalized job_billing (invoice_id IS NULL), aggregates the period's storage snapshots into storage_billing, and assembles one invoice with three sections \u2014 Job, Spare Parts, Storage \u2014 stamps a due date from payment_terms, renders a PDF to cloud storage and writes back the URL.",
    transitions: [{
      label: 'invoices.status',
      steps: [{
        k: 'muted',
        t: 'draft',
        dot: false
      }, {
        k: 'brand',
        t: 'generated'
      }, {
        k: 'info',
        t: 'sent'
      }]
    }, {
      label: 'job_billing.invoice_id',
      steps: [{
        k: 'muted',
        t: 'null',
        dot: false
      }, {
        k: 'success',
        t: 'assigned'
      }]
    }]
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Invoices \xB7 INV-2026-0088",
    title: "Northwind Traders \xB7 June cycle",
    w: 640
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 11,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    kind: "info",
    mono: true
  }, "Jun 1 \u2013 Jun 30"), /*#__PURE__*/React.createElement(Pill, {
    kind: "warning",
    mono: true
  }, "due Jul 30 \xB7 Net 30"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: "file-text"
  }, "View PDF"))), /*#__PURE__*/React.createElement(InvoiceSections, {
    sections: [{
      label: 'Job billing',
      icon: 'briefcase',
      note: '18 jobs · step charges',
      amount: '$742.60'
    }, {
      label: 'Spare parts storage',
      icon: 'anchor',
      note: '6 pallets · after grace',
      amount: '$48.40'
    }, {
      label: 'Storage',
      icon: 'warehouse',
      note: 'pallets + bins · daily',
      amount: '$1,284.00'
    }],
    total: "$2,075.00"
  }))), /*#__PURE__*/React.createElement(Step, {
    n: 5,
    actors: ['client', 'system'],
    title: "Client gets the invoice \u2014 wallet reflects it",
    note: "The invoice surfaces in the client portal with its PDF; the wallet ledger shows every debit and credit that fed it. A separate nightly job ages any unpaid invoice past its due date to overdue.",
    transitions: [{
      label: 'invoices.status',
      steps: [{
        k: 'info',
        t: 'sent'
      }, {
        k: 'success',
        t: 'paid'
      }, {
        k: 'danger',
        t: 'overdue'
      }]
    }]
  }, /*#__PURE__*/React.createElement(ScreenRow, {
    cols: "minmax(0,1.05fr) minmax(0,0.95fr)"
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "client",
    crumb: "Northwind Traders",
    title: "Invoices",
    w: "100%"
  }, /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Invoice',
      mono: true,
      w: '128px'
    }, {
      t: 'Period',
      w: '110px'
    }, {
      t: 'Amount',
      align: 'right',
      w: '84px',
      mono: true
    }, {
      t: 'Status',
      align: 'right',
      w: '74px'
    }],
    rows: [{
      __sel: true,
      cells: ['INV-2026-0088', 'June', {
        t: '$2,075.00',
        b: true
      }, {
        pill: 'info',
        t: 'sent'
      }]
    }, ['INV-2026-0072', 'May', {
      t: '$1,940.50',
      b: true
    }, {
      pill: 'success',
      t: 'paid'
    }], ['INV-2026-0061', 'April', {
      t: '$2,210.00',
      b: true
    }, {
      pill: 'danger',
      t: 'overdue'
    }]]
  })), /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Wallet \xB7 Northwind",
    title: "Ledger",
    w: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Balance"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 20,
      fontWeight: 700,
      color: '#DC2626'
    }
  }, "\u2212$2,075.00")), /*#__PURE__*/React.createElement(MiniTable, {
    dense: true,
    cols: [{
      t: 'Source',
      w: '92px',
      mono: true
    }, {
      t: 'Type',
      w: '66px'
    }, {
      t: 'Amount',
      align: 'right',
      w: '78px',
      mono: true
    }, {
      t: 'Status',
      align: 'right',
      w: '78px'
    }],
    rows: [['JOB-2051', 'debit', {
      t: '−$41.40',
      c: '#DC2626',
      b: true
    }, {
      pill: 'success',
      t: 'confirmed'
    }], ['STORAGE', 'debit', {
      t: '−$1,284.00',
      c: '#DC2626',
      b: true
    }, {
      pill: 'success',
      t: 'confirmed'
    }]]
  })))), /*#__PURE__*/React.createElement(Step, {
    n: 6,
    actors: ['supervisor', 'system'],
    last: true,
    title: "Corrections \u2014 additive, never destructive",
    note: "Billing records are immutable, so a mistake is fixed with a billing_adjustment \u2014 a credit, debit or discount \u2014 never by editing history. The adjustment writes a matching wallet transaction (credit refunds, debit charges more) and is applied to the NEXT invoice, with full audit linkage from source to target.",
    transition: {
      label: 'billing_adjustments.status',
      steps: [{
        k: 'warning',
        t: 'pending'
      }, {
        k: 'success',
        t: 'applied'
      }]
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    app: "operator",
    crumb: "Billing \xB7 Adjustments",
    title: "Correct INV-2026-0061",
    w: 640
  }, /*#__PURE__*/React.createElement(MiniTable, {
    cols: [{
      t: 'Reference',
      w: '110px',
      mono: true
    }, {
      t: 'Type',
      w: '88px'
    }, {
      t: 'Reason'
    }, {
      t: 'Amount',
      align: 'right',
      w: '84px',
      mono: true
    }, {
      t: 'Status',
      align: 'right',
      w: '84px'
    }],
    rows: [['INV-2026-0061', {
      t: 'CREDIT',
      c: '#16A34A',
      b: true
    }, 'Full reversal — billed in error', {
      t: '−$2,210.00',
      c: '#16A34A',
      b: true
    }, {
      pill: 'warning',
      t: 'pending'
    }], ['JOB-1987', {
      t: 'DEBIT',
      c: '#DC2626',
      b: true
    }, 'Under-billed pallets', {
      t: '+$36.00',
      c: '#DC2626',
      b: true
    }, {
      pill: 'success',
      t: 'applied'
    }], ['STORAGE', {
      t: 'DISCOUNT',
      c: '#7C3AED',
      b: true
    }, 'Goodwill — 10% May storage', {
      t: '−$128.00',
      c: '#7C3AED',
      b: true
    }, {
      pill: 'success',
      t: 'applied'
    }]]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Branch, null, /*#__PURE__*/React.createElement(BranchCol, {
    kind: "success",
    label: "Full reversal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 9
    }
  }, "Reverse the whole amount, mark the billing REVERSED, write a wallet credit."), /*#__PURE__*/React.createElement(Transition, {
    label: "billing",
    steps: [{
      k: 'success',
      t: 'finalized'
    }, {
      k: 'neutral',
      t: 'reversed'
    }]
  })), /*#__PURE__*/React.createElement(BranchCol, {
    kind: "info",
    label: "Applied next cycle"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 9
    }
  }, "Adjustments never touch past invoices \u2014 they roll into the next one via target_invoice_id."), /*#__PURE__*/React.createElement(Transition, {
    label: "adjustment",
    steps: [{
      k: 'warning',
      t: 'pending'
    }, {
      k: 'success',
      t: 'applied'
    }]
  })))))));
}

// Inline helpers for billing flow
function KV2({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 16,
      fontWeight: 700
    }
  }, v));
}
function InvoiceSections({
  sections,
  total
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '11px 13px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: 'var(--slate-50)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon,
    style: {
      width: 15,
      height: 15,
      color: '#2563EB'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg-tertiary)'
    }
  }, s.note)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 13,
      fontWeight: 600
    }
  }, s.amount))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '12px 13px',
      background: 'var(--slate-50)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-secondary)',
      marginLeft: 41
    }
  }, "Grand total"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 18,
      fontWeight: 800
    }
  }, total)));
}
window.Flow7 = Flow7;
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flow-7-billing.jsx", error: String((e && e.message) || e) }); }

// flows/flowkit.jsx
try { (() => {
// Stoqr — User Flows · shared storyboard kit
// Loaded as <script type="text/babel">. Exposes components on window.
// Visual language: Geist Mono, cool slate, brand blue, semantic status colors.

// ============================================================
// Status color map (matches operator/client UI kit)
// ============================================================
const STATUS = {
  success: {
    bg: '#DCFCE7',
    bd: '#86EFAC',
    fg: '#166534',
    dot: '#16A34A'
  },
  warning: {
    bg: '#FEF3C7',
    bd: '#FCD34D',
    fg: '#854D0E',
    dot: '#D97706'
  },
  danger: {
    bg: '#FEE2E2',
    bd: '#FCA5A5',
    fg: '#991B1B',
    dot: '#DC2626'
  },
  info: {
    bg: '#CFFAFE',
    bd: '#67E8F9',
    fg: '#155E75',
    dot: '#0891B2'
  },
  brand: {
    bg: '#DBEAFE',
    bd: '#93C5FD',
    fg: '#1E40AF',
    dot: '#2563EB'
  },
  neutral: {
    bg: '#EEF2F7',
    bd: '#E2E8F0',
    fg: '#334155',
    dot: '#64748B'
  },
  muted: {
    bg: '#F5F7FB',
    bd: '#E2E8F0',
    fg: '#64748B',
    dot: '#94A3B8'
  }
};

// ============================================================
// Status pill
// ============================================================
function Pill({
  kind = 'neutral',
  children,
  dot = true,
  mono = false
}) {
  const c = STATUS[kind] || STATUS.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: c.bg,
      border: `1px solid ${c.bd}`,
      color: c.fg,
      padding: '2px 7px',
      borderRadius: 9999,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: mono ? '0.01em' : '0.05em',
      textTransform: mono ? 'none' : 'uppercase',
      whiteSpace: 'nowrap',
      fontFamily: mono ? 'Geist Mono, monospace' : 'inherit',
      lineHeight: 1.4
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      background: c.dot,
      borderRadius: 9999,
      flexShrink: 0
    }
  }), children);
}

// State transition: prev → next, with an optional field label
function Transition({
  steps,
  label
}) {
  // steps: [{ k:'kind', t:'text' }, ...]
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      color: 'var(--fg-muted)',
      marginRight: 1
    }
  }, label), steps.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-muted)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement(Pill, {
    kind: s.k,
    mono: true,
    dot: s.dot !== false
  }, s.t))));
}

// ============================================================
// Actor chip
// ============================================================
const ACTORS = {
  admin: {
    label: 'Tenant admin',
    c: '#2563EB',
    icon: 'shield'
  },
  operator: {
    label: 'Operator',
    c: '#0891B2',
    icon: 'hard-hat'
  },
  supervisor: {
    label: 'Supervisor',
    c: '#7C3AED',
    icon: 'user-check'
  },
  client: {
    label: 'Client user',
    c: '#0F172A',
    icon: 'building-2'
  },
  system: {
    label: 'System',
    c: '#64748B',
    icon: 'cpu'
  }
};
function ActorChip({
  who,
  size = 'md'
}) {
  const a = ACTORS[who] || ACTORS.system;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: sm ? '2px 7px' : '3px 9px',
      borderRadius: 9999,
      background: '#fff',
      border: `1px solid ${a.c}33`,
      color: a.c,
      fontSize: sm ? 10 : 11,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": a.icon,
    style: {
      width: sm ? 11 : 12,
      height: sm ? 11 : 12,
      strokeWidth: 2
    }
  }), a.label);
}

// ============================================================
// Screen frame — a mini app window
// ============================================================
function Screen({
  app = 'operator',
  title,
  crumb,
  w,
  children,
  pad = true
}) {
  const isClient = app === 'client';
  const dotColor = isClient ? '#0F172A' : '#2563EB';
  const appLabel = isClient ? 'Client portal' : 'Operator';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w || '100%',
      maxWidth: '100%',
      background: '#fff',
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      boxShadow: '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px -6px rgba(15,23,42,0.10)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 34,
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 11px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 9999,
      background: '#E2E8F0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 9999,
      background: '#E2E8F0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 9999,
      background: '#E2E8F0'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 2,
      background: dotColor
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, appLabel)), (crumb || title) && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 11,
      height: 11,
      color: 'var(--fg-muted)'
    }
  }), crumb && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, crumb), crumb && title && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 11,
      height: 11,
      color: 'var(--fg-muted)'
    }
  }), title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad ? 12 : 0,
      flex: 1,
      minWidth: 0
    }
  }, children));
}

// ============================================================
// Button (display only)
// ============================================================
function Btn({
  variant = 'primary',
  icon,
  children,
  full = false,
  size = 'md'
}) {
  const v = {
    primary: {
      bg: '#2563EB',
      fg: '#fff',
      bd: 'transparent'
    },
    secondary: {
      bg: '#fff',
      fg: 'var(--fg-primary)',
      bd: 'var(--border-default)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--fg-secondary)',
      bd: 'transparent'
    },
    danger: {
      bg: '#DC2626',
      fg: '#fff',
      bd: 'transparent'
    },
    success: {
      bg: '#16A34A',
      fg: '#fff',
      bd: 'transparent'
    }
  }[variant];
  const h = size === 'sm' ? 26 : 30;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: h,
      padding: '0 12px',
      background: v.bg,
      color: v.fg,
      border: `1px solid ${v.bd}`,
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      width: full ? '100%' : 'auto',
      boxShadow: variant === 'primary' || variant === 'danger' || variant === 'success' ? 'inset 0 1px 0 rgba(255,255,255,0.18)' : 'none'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 13,
      height: 13
    }
  }), children);
}

// ============================================================
// Form field (display)
// ============================================================
function Field({
  label,
  value,
  ph,
  mono,
  icon,
  w
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w || '100%'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      marginBottom: 4,
      letterSpacing: '0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30,
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      background: value ? '#fff' : 'var(--slate-25)',
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '0 9px',
      fontSize: 12,
      color: value ? 'var(--fg-primary)' : 'var(--fg-muted)',
      fontFamily: mono ? 'Geist Mono, monospace' : 'inherit',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-tertiary)',
      flexShrink: 0
    }
  }), value || ph));
}

// Key/value display row
function KV({
  k,
  v,
  mono,
  kind
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '5px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-tertiary)'
    }
  }, k), kind ? /*#__PURE__*/React.createElement(Pill, {
    kind: kind,
    mono: true
  }, v) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      fontFamily: mono ? 'Geist Mono, monospace' : 'inherit',
      color: 'var(--fg-primary)'
    }
  }, v));
}

// ============================================================
// Upload zone
// ============================================================
function Upload({
  name,
  hint,
  state = 'idle',
  pct
}) {
  if (state === 'progress') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-default)',
        borderRadius: 8,
        padding: 12,
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 6,
        background: '#EFF6FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "file-spreadsheet",
      style: {
        width: 15,
        height: 15,
        color: '#2563EB'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'Geist Mono, monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: 'var(--fg-tertiary)'
      }
    }, hint)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'Geist Mono, monospace',
        color: '#2563EB'
      }
    }, pct, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        borderRadius: 9999,
        background: 'var(--slate-100)',
        marginTop: 9,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: '100%',
        background: '#2563EB',
        borderRadius: 9999
      }
    })));
  }
  if (state === 'done') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--success-border)',
        borderRadius: 8,
        padding: 12,
        background: 'var(--success-bg)',
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check-circle-2",
      style: {
        width: 16,
        height: 16,
        color: '#16A34A',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'Geist Mono, monospace',
        color: '#166534',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: '#166534'
      }
    }, hint)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px dashed var(--border-default)',
      borderRadius: 8,
      padding: '20px 12px',
      background: 'var(--slate-25)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 8,
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "upload-cloud",
    style: {
      width: 17,
      height: 17,
      color: 'var(--fg-tertiary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, name || 'Drop file or browse'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--fg-tertiary)',
      marginTop: 2
    }
  }, hint || 'Excel (.xlsx) or CSV — max 20 MB'));
}

// ============================================================
// Mini table
// ============================================================
function MiniTable({
  cols,
  rows,
  dense
}) {
  // cols: [{ t, w, align, mono }]
  // rows: [[cell, ...]] — cell can be string or {pill:'kind',t} or {mono:true,t}
  const grid = cols.map(c => c.w || '1fr').join(' ');
  const pad = dense ? '5px 9px' : '7px 9px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      overflow: 'hidden',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: grid,
      gap: 8,
      padding: '6px 9px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      textAlign: c.align || 'left'
    }
  }, c.t))), rows.map((r, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: 'grid',
      gridTemplateColumns: grid,
      gap: 8,
      padding: pad,
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
      alignItems: 'center',
      background: r.__sel ? 'var(--slate-50)' : '#fff',
      borderLeft: r.__sel ? '2px solid #2563EB' : '2px solid transparent'
    }
  }, (r.cells || r).map((cell, ci) => {
    const c = cols[ci] || {};
    if (cell && cell.pill) return /*#__PURE__*/React.createElement("div", {
      key: ci,
      style: {
        textAlign: c.align || 'left'
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      kind: cell.pill
    }, cell.t));
    const txt = cell && cell.t != null ? cell.t : cell;
    const mono = cell && cell.mono || c.mono;
    return /*#__PURE__*/React.createElement("div", {
      key: ci,
      style: {
        fontSize: 11.5,
        textAlign: c.align || 'left',
        fontFamily: mono ? 'Geist Mono, monospace' : 'inherit',
        fontWeight: cell && cell.b ? 600 : 400,
        color: cell && cell.c || 'var(--fg-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, txt);
  }))));
}

// ============================================================
// Step rail — vertical list of job tasks / flow steps with status
// ============================================================
function StepRail({
  items,
  compact
}) {
  // items: [{ label, status:'done'|'active'|'pending'|'rejected'|'system', sub, tag }]
  const cfg = {
    done: {
      c: '#16A34A',
      icon: 'check',
      ring: '#86EFAC'
    },
    active: {
      c: '#2563EB',
      icon: 'loader',
      ring: '#93C5FD'
    },
    pending: {
      c: '#94A3B8',
      icon: 'circle',
      ring: '#E2E8F0'
    },
    rejected: {
      c: '#DC2626',
      icon: 'x',
      ring: '#FCA5A5'
    },
    system: {
      c: '#64748B',
      icon: 'cpu',
      ring: '#CBD5E1'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((it, i) => {
    const c = cfg[it.status] || cfg.pending;
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 9999,
        background: it.status === 'pending' ? '#fff' : c.c,
        border: `1.5px solid ${it.status === 'pending' ? '#CBD5E1' : c.c}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: it.status === 'active' ? `0 0 0 3px ${c.ring}66` : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": c.icon,
      style: {
        width: 10,
        height: 10,
        color: it.status === 'pending' ? '#94A3B8' : '#fff',
        strokeWidth: 2.5
      }
    })), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        minHeight: compact ? 10 : 14,
        background: it.status === 'done' ? '#86EFAC' : 'var(--border-subtle)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        paddingBottom: last ? 0 : compact ? 8 : 11
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: it.status === 'active' ? 700 : 500,
        color: it.status === 'pending' ? 'var(--fg-tertiary)' : 'var(--fg-primary)'
      }
    }, it.label), it.tag && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: '#64748B',
        background: 'var(--slate-100)',
        padding: '1px 5px',
        borderRadius: 3
      }
    }, it.tag), it.status === 'active' && /*#__PURE__*/React.createElement(Pill, {
      kind: "brand"
    }, "In progress"), it.status === 'rejected' && /*#__PURE__*/React.createElement(Pill, {
      kind: "danger"
    }, "Rejected")), it.sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: 'var(--fg-tertiary)',
        marginTop: 2,
        fontFamily: it.subMono ? 'Geist Mono, monospace' : 'inherit'
      }
    }, it.sub)));
  }));
}

// ============================================================
// Banner / inline alert
// ============================================================
function Banner({
  kind = 'info',
  icon,
  title,
  children
}) {
  const c = STATUS[kind] || STATUS.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      background: c.bg,
      border: `1px solid ${c.bd}`,
      borderRadius: 6,
      padding: '9px 11px'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 15,
      height: 15,
      color: c.dot,
      flexShrink: 0,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: c.fg
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: c.fg,
      lineHeight: 1.45,
      marginTop: title ? 2 : 0
    }
  }, children)));
}

// Toast
function Toast({
  children,
  kind = 'dark'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--slate-900)',
      color: '#fff',
      padding: '9px 14px',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      boxShadow: '0 12px 24px -8px rgba(15,23,42,0.4)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 14,
      height: 14,
      color: '#86EFAC'
    }
  }), children);
}

// Section label inside a screen
function SLabel({
  children,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, children), right);
}

// Stat tiles row
function StatRow({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap: 8
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '9px 10px',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, it.label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em',
      color: it.c || 'var(--fg-primary)'
    }
  }, it.value), it.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)'
    }
  }, it.unit)))));
}

// ============================================================
// Storyboard structure: Flow > Step (with timeline rail)
// ============================================================
function Flow({
  n,
  id,
  title,
  subtitle,
  actors = [],
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      breakBefore: 'page',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      marginBottom: 26,
      paddingBottom: 18,
      borderBottom: '2px solid var(--slate-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: '-0.04em',
      color: '#2563EB',
      lineHeight: 0.9,
      flexShrink: 0
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'Geist Mono, monospace',
      fontSize: 25,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.05
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 13,
      color: 'var(--fg-secondary)',
      maxWidth: 760,
      lineHeight: 1.5
    }
  }, subtitle), actors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 11,
      flexWrap: 'wrap'
    }
  }, actors.map(a => /*#__PURE__*/React.createElement(ActorChip, {
    key: a,
    who: a,
    size: "sm"
  }))))), /*#__PURE__*/React.createElement("div", null, children));
}
function Step({
  n,
  actor,
  actors,
  title,
  transition,
  transitions,
  note,
  screen,
  children,
  last,
  branch
}) {
  // left rail line geometry
  let lineStyle;
  if (last) lineStyle = {
    top: 0,
    height: 15
  };else lineStyle = {
    top: 15,
    bottom: 0
  };
  const actorList = actors || (actor ? [actor] : []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      breakInside: 'avoid'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 30,
      flexShrink: 0
    }
  }, n != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 2,
      background: 'var(--border-default)',
      marginLeft: 14,
      ...lineStyle
    }
  }), n != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 30,
      height: 30,
      borderRadius: 9999,
      background: '#0F172A',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: 'Geist Mono, monospace',
      zIndex: 1
    }
  }, n)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingBottom: last ? 6 : 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      flexWrap: 'wrap',
      marginBottom: 4
    }
  }, actorList.map(a => /*#__PURE__*/React.createElement(ActorChip, {
    key: a,
    who: a,
    size: "sm"
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '-0.01em'
    }
  }, title)), note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontSize: 12.5,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      maxWidth: 720
    }
  }, note), (transition || transitions) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      margin: '0 0 13px'
    }
  }, (transitions || [transition]).map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      background: 'var(--slate-50)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '6px 10px',
      alignSelf: 'flex-start',
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement(Transition, {
    steps: t.steps,
    label: t.label
  })))), children));
}

// Two-outcome branch block (e.g. approve / reject)
function Branch({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginTop: 4
    }
  }, children);
}
function BranchCol({
  kind = 'success',
  label,
  children
}) {
  const c = STATUS[kind] || STATUS.success;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${c.bd}`,
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '7px 11px',
      background: c.bg,
      borderBottom: `1px solid ${c.bd}`
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": kind === 'danger' ? 'corner-down-right' : 'corner-down-right',
    style: {
      width: 13,
      height: 13,
      color: c.fg
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: c.fg
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12
    }
  }, children));
}

// Side-by-side screen pair within a step
function ScreenRow({
  children,
  cols
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols || 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 14,
      alignItems: 'start'
    }
  }, children);
}
Object.assign(window, {
  STATUS,
  Pill,
  Transition,
  ActorChip,
  ACTORS,
  Screen,
  Btn,
  Field,
  KV,
  Upload,
  MiniTable,
  StepRail,
  Banner,
  Toast,
  SLabel,
  StatRow,
  Flow,
  Step,
  Branch,
  BranchCol,
  ScreenRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/flowkit.jsx", error: String((e && e.message) || e) }); }

// flows/importer.jsx
try { (() => {
// Stoqr — User Flows · file-import kit
// Modern drag-drop upload, parse pipeline, column mapping, row-level error
// correction and a validation summary. Reused by inbound (storage list),
// outbound (packing list) and the client inventory feed. Exposes on window.

// ============================================================
// File-type chip
// ============================================================
function FileType({
  type = 'xlsx',
  size
}) {
  const cfg = type === 'csv' ? {
    icon: 'file-text',
    c: '#2563EB',
    bg: '#EFF6FF',
    label: 'CSV'
  } : {
    icon: 'file-spreadsheet',
    c: '#16A34A',
    bg: '#ECFDF3',
    label: 'XLSX'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size || 28,
      height: size || 28,
      borderRadius: 6,
      background: cfg.bg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": cfg.icon,
    style: {
      width: (size || 28) * 0.54,
      height: (size || 28) * 0.54,
      color: cfg.c
    }
  })));
}

// ============================================================
// Drag-and-drop dropzone — idle / dragging / uploading / done
// ============================================================
const GRID_BG = {
  backgroundImage: 'linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)',
  backgroundSize: '22px 22px'
};
function Dropzone({
  state = 'idle',
  name,
  hint,
  pct = 0,
  rows,
  type = 'xlsx',
  size
}) {
  if (state === 'uploading') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-default)',
        borderRadius: 10,
        padding: 14,
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(FileType, {
      type: type,
      size: 36
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: 'Geist Mono, monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: 'var(--fg-tertiary)',
        marginTop: 1
      }
    }, size, " \xB7 uploading\u2026")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        fontFamily: 'Geist Mono, monospace',
        color: '#2563EB'
      }
    }, pct, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        borderRadius: 9999,
        background: 'var(--slate-100)',
        marginTop: 11,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: '100%',
        background: 'linear-gradient(90deg,#2563EB,#1D97FF)',
        borderRadius: 9999
      }
    })));
  }
  if (state === 'done') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--success-border)',
        borderRadius: 10,
        padding: 14,
        background: 'var(--success-bg)',
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(FileType, {
      type: type,
      size: 36
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: 'Geist Mono, monospace',
        color: '#166534',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: '#166534',
        marginTop: 1
      }
    }, rows != null ? `${rows} rows parsed` : 'parsed', " \xB7 ", size)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        fontWeight: 700,
        color: '#166534',
        background: '#fff',
        border: '1px solid var(--success-border)',
        borderRadius: 9999,
        padding: '3px 9px'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 12,
        height: 12,
        strokeWidth: 3
      }
    }), "Parsed"));
  }
  const dragging = state === 'dragging';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px dashed ${dragging ? '#2563EB' : 'var(--border-default)'}`,
      borderRadius: 10,
      padding: '26px 18px',
      textAlign: 'center',
      background: dragging ? 'rgba(37,99,235,0.05)' : 'var(--slate-25)',
      ...(dragging ? {} : GRID_BG),
      transition: 'border-color .18s, background .18s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: dragging ? '#2563EB' : '#fff',
      border: dragging ? 'none' : '1px solid var(--border-subtle)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 11,
      boxShadow: '0 1px 2px rgba(15,23,42,0.06)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": dragging ? 'download' : 'upload-cloud',
    style: {
      width: 22,
      height: 22,
      color: dragging ? '#fff' : 'var(--fg-tertiary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: dragging ? '#1E40AF' : 'var(--fg-primary)'
    }
  }, dragging ? 'Drop to upload' : name || 'Drag & drop your file here'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg-tertiary)',
      marginTop: 4
    }
  }, hint || 'or click to browse'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      marginTop: 12
    }
  }, ['XLSX', 'CSV'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 5,
      padding: '3px 8px'
    }
  }, ".", t.toLowerCase())), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      color: 'var(--fg-muted)',
      alignSelf: 'center'
    }
  }, "max 20 MB")));
}

// ============================================================
// Parse pipeline — horizontal status stepper
// ============================================================
function ParsePipeline({
  stages,
  current = 0,
  failedAt
}) {
  // stages: [{ key, label }]
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      overflow: 'hidden'
    }
  }, stages.map((s, i) => {
    const failed = failedAt === i;
    const done = i < current;
    const active = i === current && !failed;
    const c = failed ? '#DC2626' : done ? '#16A34A' : active ? '#2563EB' : '#CBD5E1';
    const last = i === stages.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.key
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 19,
        height: 19,
        borderRadius: 9999,
        background: done || active || failed ? c : '#fff',
        border: `1.5px solid ${c}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active ? '0 0 0 3px rgba(37,99,235,0.18)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": failed ? 'x' : done ? 'check' : active ? 'loader' : 'circle',
      style: {
        width: 10,
        height: 10,
        color: done || active || failed ? '#fff' : '#CBD5E1',
        strokeWidth: 3
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono, monospace',
        fontSize: 8.5,
        fontWeight: active ? 700 : 500,
        color: active ? '#2563EB' : failed ? '#DC2626' : 'var(--fg-tertiary)',
        whiteSpace: 'nowrap'
      }
    }, s.label)), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 2,
        background: done ? '#86EFAC' : 'var(--border-subtle)',
        margin: '0 4px',
        marginBottom: 16,
        minWidth: 12
      }
    }));
  }));
}

// ============================================================
// Column mapping — file column → Stoqr field, with disposition
// ============================================================
const DISPOSITION = {
  required: {
    c: '#DC2626',
    bg: '#FEE2E2',
    label: 'Required'
  },
  optional: {
    c: '#64748B',
    bg: '#EEF2F7',
    label: 'Optional'
  },
  resolve: {
    c: '#2563EB',
    bg: '#DBEAFE',
    label: 'Resolve'
  },
  core: {
    c: '#7C3AED',
    bg: '#EDE9FE',
    label: 'Core'
  },
  computed: {
    c: '#0891B2',
    bg: '#CFFAFE',
    label: 'Computed'
  },
  snapshot: {
    c: '#0F172A',
    bg: '#EEF2F7',
    label: 'Snapshot'
  },
  dropped: {
    c: '#94A3B8',
    bg: '#F5F7FB',
    label: 'Dropped'
  }
};
function MapConfig({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 10
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: '4px 9px',
      background: 'var(--slate-25)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, it.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 11,
      fontWeight: 600
    }
  }, it.v))));
}
function ColumnMap({
  rows
}) {
  // rows: [{ col, header, sample, field, disp, unmapped }]
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 22px 1.25fr 92px',
      gap: 8,
      padding: '7px 11px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, ['File column', '', 'Stoqr field', 'Disposition'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, t))), rows.map((r, i) => {
    const d = DISPOSITION[r.disp] || DISPOSITION.optional;
    const last = i === rows.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '1.35fr 22px 1.25fr 92px',
        gap: 8,
        padding: '8px 11px',
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
        alignItems: 'center',
        background: r.unmapped ? 'rgba(220,38,38,0.035)' : '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono, monospace',
        fontSize: 9,
        fontWeight: 700,
        color: 'var(--fg-muted)',
        background: 'var(--slate-100)',
        borderRadius: 3,
        padding: '1px 4px',
        flexShrink: 0
      }
    }, r.col), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono, monospace',
        fontSize: 11.5,
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, r.header)), r.sample && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--fg-muted)',
        marginTop: 2,
        fontFamily: 'Geist Mono, monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, r.sample)), /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 13,
        height: 13,
        color: 'var(--fg-muted)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, r.unmapped ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
        height: 26,
        border: '1px solid #FCA5A5',
        borderRadius: 6,
        padding: '0 8px',
        background: '#fff',
        color: '#DC2626',
        fontSize: 11,
        fontWeight: 600
      }
    }, "Select field\u2026 ", /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevron-down",
      style: {
        width: 12,
        height: 12
      }
    })) : r.field === '—' ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--fg-muted)',
        fontStyle: 'italic'
      }
    }, "not imported") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
        height: 26,
        border: '1px solid var(--border-default)',
        borderRadius: 6,
        padding: '0 8px',
        background: 'var(--slate-25)',
        fontFamily: 'Geist Mono, monospace',
        fontSize: 11,
        fontWeight: 600,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, r.field), /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevron-down",
      style: {
        width: 12,
        height: 12,
        color: 'var(--fg-muted)',
        flexShrink: 0
      }
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: d.c,
        background: d.bg,
        borderRadius: 4,
        padding: '2px 6px'
      }
    }, r.disp === 'required' && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        borderRadius: 9999,
        background: d.c
      }
    }), d.label)));
  }));
}

// ============================================================
// Review grid — parsed rows with per-cell validation + inline fix
// ============================================================
function ReviewGrid({
  cols,
  rows
}) {
  const grid = cols.map(c => c.w || '1fr').join(' ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      overflow: 'hidden',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: grid,
      gap: 8,
      padding: '6px 10px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      textAlign: c.align || 'left'
    }
  }, c.t))), rows.map((r, ri) => {
    const last = ri === rows.length - 1;
    const edge = r.state === 'error' ? '#DC2626' : r.state === 'warning' ? '#D97706' : 'transparent';
    const tint = r.state === 'error' ? 'rgba(220,38,38,0.035)' : r.state === 'warning' ? 'rgba(217,119,6,0.04)' : '#fff';
    return /*#__PURE__*/React.createElement("div", {
      key: ri,
      style: {
        borderBottom: last && !r.fix ? 'none' : '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: grid,
        gap: 8,
        padding: '7px 10px',
        alignItems: 'center',
        background: tint,
        borderLeft: `2px solid ${edge}`
      }
    }, r.cells.map((cell, ci) => {
      const c = cols[ci] || {};
      if (cell && cell.pill) return /*#__PURE__*/React.createElement("div", {
        key: ci,
        style: {
          textAlign: c.align || 'left'
        }
      }, /*#__PURE__*/React.createElement(Pill, {
        kind: cell.pill
      }, cell.t));
      const bad = cell && cell.bad;
      const mono = cell && cell.mono || c.mono;
      const txt = cell && cell.t != null ? cell.t : cell;
      if (bad) {
        return /*#__PURE__*/React.createElement("div", {
          key: ci,
          style: {
            textAlign: c.align || 'left'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            border: '1px solid #FCA5A5',
            background: '#fff',
            borderRadius: 5,
            padding: '2px 6px',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 11,
            color: '#DC2626',
            fontWeight: 600
          }
        }, txt, /*#__PURE__*/React.createElement("i", {
          "data-lucide": "pencil",
          style: {
            width: 10,
            height: 10
          }
        })));
      }
      return /*#__PURE__*/React.createElement("div", {
        key: ci,
        style: {
          fontSize: 11,
          textAlign: c.align || 'left',
          fontFamily: mono ? 'Geist Mono, monospace' : 'inherit',
          fontWeight: cell && cell.b ? 600 : 400,
          color: cell && cell.c || 'var(--fg-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, txt);
    })), r.fix && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 10px 8px 12px',
        background: tint,
        borderLeft: `2px solid ${edge}`
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": r.state === 'warning' ? 'alert-triangle' : 'alert-circle',
      style: {
        width: 13,
        height: 13,
        color: edge,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: r.state === 'warning' ? '#854D0E' : '#991B1B',
        flex: 1,
        minWidth: 0
      }
    }, r.fix), r.action && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 24,
        padding: '0 9px',
        border: `1px solid ${edge}`,
        background: '#fff',
        borderRadius: 6,
        fontSize: 10.5,
        fontWeight: 600,
        color: edge,
        whiteSpace: 'nowrap'
      }
    }, r.actionIcon && /*#__PURE__*/React.createElement("i", {
      "data-lucide": r.actionIcon,
      style: {
        width: 11,
        height: 11
      }
    }), r.action)));
  }));
}

// ============================================================
// Validation summary bar
// ============================================================
function ValidationBar({
  total,
  ready,
  errors = 0,
  warnings = 0
}) {
  const seg = (n, color) => n > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: n,
      background: color
    }
  }) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      padding: 11,
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 9,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace',
      fontSize: 18,
      fontWeight: 700
    }
  }, total), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "rows")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 18,
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement(Count, {
    icon: "check-circle-2",
    c: "#16A34A",
    n: ready,
    label: "ready"
  }), /*#__PURE__*/React.createElement(Count, {
    icon: "x-circle",
    c: "#DC2626",
    n: errors,
    label: "errors"
  }), /*#__PURE__*/React.createElement(Count, {
    icon: "alert-triangle",
    c: "#D97706",
    n: warnings,
    label: "warnings"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 10.5,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      padding: '4px 9px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "filter",
    style: {
      width: 11,
      height: 11
    }
  }), "Show errors only")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 6,
      borderRadius: 9999,
      overflow: 'hidden',
      background: 'var(--slate-100)'
    }
  }, seg(ready, '#16A34A'), seg(errors, '#DC2626'), seg(warnings, '#D97706')));
}
function Count({
  icon,
  c,
  n,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 11.5,
      color: n > 0 ? c : 'var(--fg-muted)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 13,
      height: 13
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono, monospace'
    }
  }, n), " ", label);
}
Object.assign(window, {
  FileType,
  Dropzone,
  ParsePipeline,
  ColumnMap,
  MapConfig,
  ReviewGrid,
  ValidationBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "flows/importer.jsx", error: String((e && e.message) || e) }); }

// preview/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "preview/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client/ClientPages.jsx
try { (() => {
// Stoqr Client — Overview / inventory / request stock / approvals
function ClientOverview({
  onRequest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '28px 28px 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Tuesday, May 5"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'Geist Mono',
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "Welcome back, Jordan."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg-secondary)',
      marginTop: 4
    }
  }, "Your warehouse ", /*#__PURE__*/React.createElement("strong", null, "Atlas-3"), " has 4 actions waiting on you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRequest,
    style: {
      height: 36,
      padding: '0 14px',
      background: '#2563EB',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-down-up",
    style: {
      width: 14,
      height: 14
    }
  }), "Request stock movement"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(ClientStat, {
    label: "On hand",
    value: "48,210",
    unit: "units"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "In transit",
    value: "3,402",
    unit: "units",
    tone: "info"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Open requests",
    value: "6"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "SKUs below reorder",
    value: "11",
    tone: "warning"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 16,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Recent activity",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement(ActivityRow, {
    icon: "package-plus",
    who: "Atlas",
    action: "Received 1,200 units",
    sub: "SKU-049281-NV \xB7 from supplier ACME-09",
    t: "2h ago",
    tone: "info"
  }), /*#__PURE__*/React.createElement(ActivityRow, {
    icon: "check-circle-2",
    who: "You",
    action: "Approved transfer \xB7 240 units",
    sub: "W-02 \u2192 W-04 \xB7 suggested by Atlas",
    t: "Yesterday",
    tone: "success"
  }), /*#__PURE__*/React.createElement(ActivityRow, {
    icon: "clipboard-check",
    who: "Atlas",
    action: "Closed cycle count #2841",
    sub: "Variance 0.4% \u2014 within tolerance",
    t: "Yesterday",
    tone: "success"
  }), /*#__PURE__*/React.createElement(ActivityRow, {
    icon: "alert-triangle",
    who: "Atlas",
    action: "Flagged variance",
    sub: "Bin C-08-03 \xB7 \u221222 units",
    t: "2d ago",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(ActivityRow, {
    icon: "package-minus",
    who: "Marcus L.",
    action: "Posted shipment \xB7 84 units",
    sub: "Order #SO-99412",
    t: "2d ago",
    tone: "info"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Action queue",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: '#DC2626',
        fontWeight: 600
      }
    }, "4 waiting")
  }, /*#__PURE__*/React.createElement(ActionRow, {
    title: "Approve transfer \xB7 240 units",
    body: "Atlas suggests rebalancing W-02 \u2192 W-04.",
    kind: "ai"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    title: "Confirm receipt \xB7 PO-77291",
    body: "1,200 units arrived at dock 3 yesterday.",
    kind: "info"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    title: "Resolve variance \xB7 bin C-08-03",
    body: "System \u221222. Recount or accept?",
    kind: "warning"
  }), /*#__PURE__*/React.createElement(ActionRow, {
    title: "Sign off cycle count #2843",
    body: "Marcus completed his pass at 3:48 PM.",
    kind: "success"
  }))));
}
function ClientStat({
  label,
  value,
  unit,
  tone
}) {
  const accent = tone === 'warning' ? '#D97706' : tone === 'info' ? '#0891B2' : 'var(--fg-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.02em',
      color: accent
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-tertiary)'
    }
  }, unit)));
}
function ActivityRow({
  icon,
  who,
  action,
  sub,
  t,
  tone
}) {
  const bgMap = {
    info: '#CFFAFE',
    success: '#DCFCE7',
    warning: '#FEF3C7',
    danger: '#FEE2E2'
  };
  const fgMap = {
    info: '#0891B2',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: bgMap[tone],
      color: fgMap[tone],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, action), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      fontFamily: 'Geist Mono',
      whiteSpace: 'nowrap'
    }
  }, who, " \xB7 ", t));
}
function ActionRow({
  title,
  body,
  kind
}) {
  const icMap = {
    ai: 'sparkles',
    info: 'info',
    warning: 'alert-triangle',
    success: 'check-circle-2'
  };
  const fgMap = {
    ai: '#7C3AED',
    info: '#0891B2',
    warning: '#D97706',
    success: '#16A34A'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icMap[kind],
    style: {
      width: 13,
      height: 13,
      color: fgMap[kind]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.45,
      marginLeft: 21
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 8,
      marginLeft: 21
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: '#2563EB',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Review"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: 'none',
      padding: '5px 8px',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Snooze")));
}
function ClientRequest({
  onSubmit,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 540,
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      boxShadow: '0 24px 48px -12px rgba(15,23,42,0.20)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "Request stock movement"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginLeft: 'auto',
      width: 28,
      height: 28,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 14,
      height: 14
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "SKU"
  }, /*#__PURE__*/React.createElement("input", {
    value: "SKU-049281-NV",
    readOnly: true,
    style: inp('mono')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "From"
  }, /*#__PURE__*/React.createElement("div", {
    style: inp()
  }, "W-02 \xB7 Houston North")), /*#__PURE__*/React.createElement(Field, {
    label: "To"
  }, /*#__PURE__*/React.createElement("div", {
    style: inp()
  }, "W-04 \xB7 Dallas East"))), /*#__PURE__*/React.createElement(Field, {
    label: "Quantity"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "240",
    style: inp()
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Reason"
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    defaultValue: "Demand projection at W-04 has grown 18% over the last 30 days.",
    style: {
      ...inp(),
      height: 'auto',
      padding: 10,
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FAF5FF',
      border: '1px solid #C4B5FD',
      borderRadius: 6,
      padding: 10,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 14,
      height: 14,
      color: '#7C3AED',
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#5B21B6',
      lineHeight: 1.5
    }
  }, "Atlas pre-filled this from your demand model. You can edit any field \u2014 Atlas will note overrides."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      height: 34,
      padding: '0 14px',
      background: '#fff',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onSubmit,
    style: {
      height: 34,
      padding: '0 14px',
      background: '#2563EB',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Submit request"))));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--fg-secondary)',
      marginBottom: 6
    }
  }, label), children);
}
function inp(kind) {
  return {
    width: '100%',
    height: 34,
    padding: '0 10px',
    border: '1px solid var(--border-default)',
    borderRadius: 6,
    fontSize: 13,
    fontFamily: kind === 'mono' ? 'Geist Mono, monospace' : 'inherit',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    outline: 'none'
  };
}
Object.assign(window, {
  ClientOverview,
  ClientRequest
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client/ClientPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client/ClientShell.jsx
try { (() => {
// Stoqr Client — shared shell (topbar + page chrome) for tenant-facing app
const {
  useState: useStateClient
} = React;
function ClientTopbar({
  active,
  onNav
}) {
  const items = [{
    k: 'home',
    label: 'Overview'
  }, {
    k: 'inventory',
    label: 'Inventory'
  }, {
    k: 'requests',
    label: 'Requests'
  }, {
    k: 'approvals',
    label: 'Approvals',
    count: 4
  }, {
    k: 'history',
    label: 'History'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 64,
      background: '#fff',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: 28,
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/stoqr-mark.svg",
    style: {
      height: 22
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: '-0.02em'
    }
  }, "stoqr"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: 'var(--slate-100)',
      color: 'var(--slate-700)',
      padding: '2px 6px',
      borderRadius: 4,
      marginLeft: 4
    }
  }, "Client")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.k,
    onClick: () => onNav(it.k),
    style: {
      height: 32,
      padding: '0 12px',
      background: active === it.k ? 'var(--slate-100)' : 'transparent',
      color: active === it.k ? 'var(--fg-primary)' : 'var(--fg-secondary)',
      border: 'none',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: active === it.k ? 600 : 500,
      fontFamily: 'inherit',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      background: '#DC2626',
      color: '#fff',
      padding: '1px 6px',
      borderRadius: 9999
    }
  }, it.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      height: 32,
      padding: '0 10px',
      background: '#fff',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "warehouse",
    style: {
      width: 13,
      height: 13,
      color: 'var(--fg-tertiary)'
    }
  }), "Atlas-3 \xB7 Houston", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-tertiary)'
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      border: '1px solid var(--border-subtle)',
      background: '#fff',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 15,
      height: 15
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9999,
      background: '#0F172A',
      color: '#fff',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "JR")));
}
Object.assign(window, {
  ClientTopbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client/ClientShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client/MoreClientPages.jsx
try { (() => {
// Stoqr Client — Inventory, Requests, Approvals, History pages
// Composed from operator's Button/Card/Stat/StatusPill primitives.

function ClientPageHeader({
  eyebrow,
  title,
  subtitle,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'Geist Mono',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 4
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, actions));
}
function ClientPageWrap({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '28px 28px 60px'
    }
  }, children);
}

// ─── Inventory ─────────────────────────────────────────────────────────
function ClientInventoryPage() {
  const rows = [{
    sku: 'SKU-049281-NV',
    name: 'Acetic anhydride · 200L drum',
    oh: 1240,
    tx: 240,
    rp: 800,
    bin: 'A-04-12',
    status: 'ok'
  }, {
    sku: 'SKU-051922-RT',
    name: 'Phenolic resin · 25kg bag',
    oh: 92,
    tx: 0,
    rp: 150,
    bin: 'C-08-03',
    status: 'low'
  }, {
    sku: 'SKU-061104-XL',
    name: 'PET preform · 28mm neck',
    oh: 18420,
    tx: 1200,
    rp: 12000,
    bin: 'B-02-18',
    status: 'ok'
  }, {
    sku: 'SKU-073301-AC',
    name: 'Aluminum coil · 1050-H14',
    oh: 0,
    tx: 800,
    rp: 600,
    bin: 'D-01-05',
    status: 'oos'
  }, {
    sku: 'SKU-080012-PG',
    name: 'Propylene glycol · 1000L tote',
    oh: 612,
    tx: 0,
    rp: 400,
    bin: 'A-09-02',
    status: 'ok'
  }, {
    sku: 'SKU-091845-CB',
    name: 'Corrugated B-flute · 24"',
    oh: 4810,
    tx: 0,
    rp: 5000,
    bin: 'E-12-09',
    status: 'low'
  }, {
    sku: 'SKU-102237-MS',
    name: 'Mil-spec fastener kit · M6',
    oh: 230,
    tx: 120,
    rp: 200,
    bin: 'F-03-14',
    status: 'ok'
  }];
  const tone = {
    ok: 'success',
    low: 'warning',
    oos: 'danger'
  };
  const lbl = {
    ok: 'In stock',
    low: 'Below reorder',
    oos: 'Out of stock'
  };
  return /*#__PURE__*/React.createElement(ClientPageWrap, null, /*#__PURE__*/React.createElement(ClientPageHeader, {
    eyebrow: "Atlas-3 \xB7 Houston",
    title: "Inventory",
    subtitle: "Real-time view of every SKU you have at this warehouse.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "download"
    }, "Export"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "filter"
    }, "Saved views"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ClientStat, {
    label: "On hand",
    value: "48,210",
    unit: "units"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "In transit",
    value: "3,402",
    unit: "units",
    tone: "info"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Below reorder",
    value: "11",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Out of stock",
    value: "2",
    tone: "danger"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "All SKUs",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--fg-tertiary)'
      }
    }, rows.length, " of 1,847"),
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("input", {
      placeholder: "Search SKU or name\u2026",
      style: {
        height: 28,
        width: 220,
        padding: '0 10px',
        border: '1px solid var(--border-default)',
        borderRadius: 6,
        fontSize: 12,
        fontFamily: 'inherit'
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: "sliders-horizontal"
    }, "Filter"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 -16px -14px'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, ['SKU', 'Name', 'On hand', 'In transit', 'Reorder pt', 'Bin', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === 'Name' || h === 'Bin' ? 'left' : h === 'SKU' ? 'left' : 'right',
      padding: '8px 14px',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--fg-tertiary)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.sku,
    style: {
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, r.sku), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      fontWeight: 500
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'Geist Mono',
      fontVariantNumeric: 'tabular-nums',
      color: r.status === 'oos' ? '#DC2626' : 'var(--fg-primary)'
    }
  }, r.oh.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'Geist Mono',
      fontVariantNumeric: 'tabular-nums',
      color: r.tx ? '#0891B2' : 'var(--fg-tertiary)'
    }
  }, r.tx ? r.tx.toLocaleString() : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'Geist Mono',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--fg-tertiary)'
    }
  }, r.rp.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px',
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, r.bin), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    kind: tone[r.status]
  }, lbl[r.status])))))))));
}

// ─── Requests ──────────────────────────────────────────────────────────
function ClientRequestsPage({
  onNewRequest
}) {
  const reqs = [{
    id: 'REQ-3019',
    kind: 'Transfer',
    what: '240u SKU-049281-NV',
    from: 'W-02',
    to: 'W-04',
    when: 'Today · 9:14 AM',
    status: 'pending',
    sub: 'Pending Atlas review'
  }, {
    id: 'REQ-3018',
    kind: 'Reorder',
    what: '5,000u SKU-091845-CB',
    from: 'Supplier ULINE-04',
    to: 'W-03',
    when: 'Today · 8:02 AM',
    status: 'approved',
    sub: 'PO-77295 · ETA Thu'
  }, {
    id: 'REQ-3017',
    kind: 'Adjust',
    what: '−22u bin C-08-03',
    from: 'W-02',
    to: '—',
    when: 'Yesterday · 5:48 PM',
    status: 'pending',
    sub: 'Variance from cycle count #2841'
  }, {
    id: 'REQ-3015',
    kind: 'Transfer',
    what: '120u SKU-102237-MS',
    from: 'W-04',
    to: 'W-02',
    when: 'Yesterday · 2:11 PM',
    status: 'rejected',
    sub: 'Marcus · insufficient projected demand'
  }, {
    id: 'REQ-3014',
    kind: 'Reorder',
    what: '800u SKU-073301-AC',
    from: 'Supplier ALCOA-12',
    to: 'W-04',
    when: '2d ago',
    status: 'approved',
    sub: 'PO-77291 · received'
  }, {
    id: 'REQ-3011',
    kind: 'Disposal',
    what: '12u SKU-051922-RT',
    from: 'W-02',
    to: '—',
    when: '3d ago',
    status: 'approved',
    sub: 'Expired lot'
  }];
  const tone = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  };
  return /*#__PURE__*/React.createElement(ClientPageWrap, null, /*#__PURE__*/React.createElement(ClientPageHeader, {
    eyebrow: "My requests",
    title: "Requests",
    subtitle: "Stock movements, reorders, and adjustments you've submitted.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "plus",
      onClick: onNewRequest
    }, "New request")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ClientStat, {
    label: "Open",
    value: "6"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Approved (30d)",
    value: "48",
    tone: "info"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Rejected (30d)",
    value: "3",
    tone: "danger"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Avg time to decision",
    value: "11m"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "All requests",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4
      }
    }, ['All', 'Pending', 'Approved', 'Rejected'].map((t, i) => /*#__PURE__*/React.createElement("button", {
      key: t,
      style: {
        height: 26,
        padding: '0 10px',
        background: i === 0 ? 'var(--slate-100)' : 'transparent',
        border: 'none',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'inherit',
        color: i === 0 ? 'var(--fg-primary)' : 'var(--fg-secondary)',
        cursor: 'pointer'
      }
    }, t)))
  }, reqs.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      paddingTop: 2
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-secondary)',
      background: 'var(--slate-100)',
      padding: '2px 6px',
      borderRadius: 3
    }
  }, r.kind), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, r.what)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 4,
      fontFamily: 'Geist Mono'
    }
  }, r.from, " \u2192 ", r.to, " \xB7 ", r.when), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 2
    }
  }, r.sub)), /*#__PURE__*/React.createElement(StatusPill, {
    kind: tone[r.status]
  }, r.status)))), /*#__PURE__*/React.createElement(Card, {
    title: "Suggested by Atlas",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: '#7C3AED',
        fontWeight: 600,
        fontFamily: 'Geist Mono',
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }
    }, "AI")
  }, /*#__PURE__*/React.createElement(SuggestionRow, {
    title: "Reorder SKU-091845-CB",
    body: "Projected stockout in 5 days at W-03. Suggested 5,000u."
  }), /*#__PURE__*/React.createElement(SuggestionRow, {
    title: "Transfer 80u from W-04 \u2192 W-02",
    body: "W-02 burning faster than expected."
  }), /*#__PURE__*/React.createElement(SuggestionRow, {
    title: "Cycle-count bin F-03-14",
    body: "No count in 60d. 3 high-velocity SKUs."
  }))));
}
function SuggestionRow({
  title,
  body
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 3,
      lineHeight: 1.45
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: '#2563EB',
      color: '#fff',
      border: 'none',
      padding: '4px 10px',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Submit"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: 'none',
      padding: '4px 8px',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--fg-secondary)',
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "Dismiss")));
}

// ─── Approvals ─────────────────────────────────────────────────────────
function ClientApprovalsPage() {
  const queue = [{
    id: 'APR-991',
    kind: 'Transfer',
    what: '240u SKU-049281-NV · W-02 → W-04',
    who: 'Atlas',
    why: 'Demand at W-04 +18% over 30d',
    age: '4m',
    selected: true
  }, {
    id: 'APR-990',
    kind: 'Reorder',
    what: '5,000u SKU-091845-CB · ULINE-04 → W-03',
    who: 'Atlas',
    why: 'Projected stockout in 5d',
    age: '12m'
  }, {
    id: 'APR-989',
    kind: 'Adjust',
    what: '−22u SKU-051922-RT · bin C-08-03',
    who: 'Marcus L.',
    why: 'Cycle count #2841 variance',
    age: '1h'
  }, {
    id: 'APR-988',
    kind: 'Disposal',
    what: '12u SKU-051922-RT · expired',
    who: 'Atlas',
    why: 'Lot RT-1029 past use-by',
    age: '3h'
  }];
  return /*#__PURE__*/React.createElement(ClientPageWrap, null, /*#__PURE__*/React.createElement(ClientPageHeader, {
    eyebrow: "Action queue",
    title: "Approvals",
    subtitle: "Decisions only you can make. Atlas does the rest.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "check-check"
    }, "Bulk approve"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "settings-2"
    }, "Approval rules"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ClientStat, {
    label: "Waiting on you",
    value: "4",
    tone: "danger"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Auto-approved today",
    value: "118",
    tone: "info"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Saved by rules (30d)",
    value: "2,402"
  }), /*#__PURE__*/React.createElement(ClientStat, {
    label: "Avg decision time",
    value: "11m"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Queue",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: '#DC2626',
        fontWeight: 600
      }
    }, "4")
  }, queue.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.id,
    style: {
      padding: '12px 12px',
      margin: '0 -12px',
      borderLeft: q.selected ? '2px solid #2563EB' : '2px solid transparent',
      background: q.selected ? 'var(--slate-50)' : 'transparent',
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-secondary)',
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      padding: '2px 6px',
      borderRadius: 3
    }
  }, q.kind), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, q.id), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      fontFamily: 'Geist Mono'
    }
  }, q.age)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      marginTop: 6
    }
  }, q.what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 3
    }
  }, "by ", q.who, " \u2014 ", q.why)))), /*#__PURE__*/React.createElement(Card, {
    title: "APR-991 \xB7 Transfer",
    meta: /*#__PURE__*/React.createElement(StatusPill, {
      kind: "warning"
    }, "Pending your approval"),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: "x"
    }, "Reject"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "check"
    }, "Approve"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      padding: '4px 0 12px'
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "SKU",
    value: "SKU-049281-NV",
    mono: true
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Quantity",
    value: "240 units"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "From",
    value: "W-02 \xB7 Houston North"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "To",
    value: "W-04 \xB7 Dallas East"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Submitted",
    value: "Today \xB7 9:14 AM"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "Submitted by",
    value: "Atlas (auto-suggestion)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FAF5FF',
      border: '1px solid #C4B5FD',
      borderRadius: 6,
      padding: 12,
      display: 'flex',
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 14,
      height: 14,
      color: '#7C3AED',
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#5B21B6'
    }
  }, "Atlas's reasoning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#5B21B6',
      lineHeight: 1.5,
      marginTop: 4
    }
  }, "W-04's 30-day burn rate for SKU-049281-NV grew 18% (1,820 \u2192 2,148 u/wk). At current pace W-04 stocks out in 9 days; W-02 has 18 days of cover. Transfer cost $182, projected stockout cost $2,400."))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      marginBottom: 8
    }
  }, "Activity"), /*#__PURE__*/React.createElement(ActivityLite, {
    who: "Atlas",
    what: "Drafted suggestion",
    t: "9:14 AM"
  }), /*#__PURE__*/React.createElement(ActivityLite, {
    who: "System",
    what: "Routed to your queue (above $200 threshold)",
    t: "9:14 AM"
  }), /*#__PURE__*/React.createElement(ActivityLite, {
    who: "Marcus L.",
    what: "Added note: 'Looks correct. Defer to Jordan.'",
    t: "9:31 AM"
  }))));
}
function DetailField({
  label,
  value,
  mono
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      marginTop: 4,
      fontFamily: mono ? 'Geist Mono' : 'inherit',
      fontWeight: 500
    }
  }, value));
}
function ActivityLite({
  who,
  what,
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '6px 0',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      fontFamily: 'Geist Mono',
      color: 'var(--fg-tertiary)'
    }
  }, t), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-primary)',
      fontWeight: 600
    }
  }, who), " \xB7 ", what));
}

// ─── History ───────────────────────────────────────────────────────────
function ClientHistoryPage() {
  const events = [{
    d: 'Today',
    items: [{
      t: '11:42 AM',
      icon: 'package-plus',
      tone: 'info',
      who: 'Atlas',
      what: 'Received 1,200u SKU-049281-NV',
      sub: 'PO-77295 · supplier ACME-09 · dock 3'
    }, {
      t: '10:18 AM',
      icon: 'arrow-right',
      tone: 'info',
      who: 'Atlas',
      what: 'Transferred 80u SKU-080012-PG',
      sub: 'W-02 → W-03 (auto, under $200)'
    }, {
      t: '9:31 AM',
      icon: 'message-circle',
      tone: 'info',
      who: 'Marcus L.',
      what: 'Commented on APR-991',
      sub: '"Looks correct. Defer to Jordan."'
    }, {
      t: '9:14 AM',
      icon: 'sparkles',
      tone: 'ai',
      who: 'Atlas',
      what: 'Drafted transfer suggestion',
      sub: 'APR-991 · 240u W-02 → W-04'
    }]
  }, {
    d: 'Yesterday',
    items: [{
      t: '5:48 PM',
      icon: 'alert-triangle',
      tone: 'warning',
      who: 'Atlas',
      what: 'Flagged variance bin C-08-03',
      sub: 'System −22u during cycle count #2841'
    }, {
      t: '3:48 PM',
      icon: 'clipboard-check',
      tone: 'success',
      who: 'Marcus L.',
      what: 'Completed cycle count #2843',
      sub: '128 bins · 0.4% variance'
    }, {
      t: '2:11 PM',
      icon: 'x-circle',
      tone: 'danger',
      who: 'Marcus L.',
      what: 'Rejected REQ-3015',
      sub: 'Insufficient projected demand at W-02'
    }, {
      t: '11:02 AM',
      icon: 'check-circle-2',
      tone: 'success',
      who: 'You',
      what: 'Approved transfer 240u',
      sub: 'W-02 → W-04 (suggested by Atlas)'
    }]
  }, {
    d: '2 days ago',
    items: [{
      t: '4:30 PM',
      icon: 'package-minus',
      tone: 'info',
      who: 'Marcus L.',
      what: 'Posted shipment 84u',
      sub: 'Order #SO-99412'
    }, {
      t: '9:00 AM',
      icon: 'settings-2',
      tone: 'info',
      who: 'You',
      what: 'Updated approval rule',
      sub: 'Auto-approve transfers under $250 (was $200)'
    }]
  }];
  const bgMap = {
    info: '#CFFAFE',
    success: '#DCFCE7',
    warning: '#FEF3C7',
    danger: '#FEE2E2',
    ai: '#EDE9FE'
  };
  const fgMap = {
    info: '#0891B2',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    ai: '#7C3AED'
  };
  return /*#__PURE__*/React.createElement(ClientPageWrap, null, /*#__PURE__*/React.createElement(ClientPageHeader, {
    eyebrow: "Audit log",
    title: "History",
    subtitle: "Everything that's happened at Atlas-3, by you, your team, and Atlas.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "filter"
    }, "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      icon: "download"
    }, "Export CSV"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Activity"
  }, events.map(group => /*#__PURE__*/React.createElement("div", {
    key: group.d,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      padding: '8px 0',
      borderBottom: '1px solid var(--border-subtle)',
      marginBottom: 6
    }
  }, group.d), group.items.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      fontSize: 11,
      fontFamily: 'Geist Mono',
      color: 'var(--fg-tertiary)',
      paddingTop: 6
    }
  }, e.t), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: bgMap[e.tone],
      color: fgMap[e.tone],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": e.icon,
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600
    }
  }, e.who), " \xB7 ", e.what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, e.sub))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Filter by actor"
  }, [{
    k: 'Atlas',
    n: 1284,
    c: '#7C3AED'
  }, {
    k: 'You',
    n: 47,
    c: '#2563EB'
  }, {
    k: 'Marcus L.',
    n: 38,
    c: '#16A34A'
  }, {
    k: 'Sara K.',
    n: 12,
    c: '#D97706'
  }, {
    k: 'System',
    n: 318,
    c: 'var(--fg-tertiary)'
  }].map(a => /*#__PURE__*/React.createElement("label", {
    key: a.k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 0',
      fontSize: 13,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    style: {
      accentColor: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 9999,
      background: a.c
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, a.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, a.n)))), /*#__PURE__*/React.createElement(Card, {
    title: "Range"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, ['Today', 'Last 7 days', 'Last 30 days', 'Quarter to date', 'Custom…'].map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: r,
    style: {
      textAlign: 'left',
      height: 30,
      padding: '0 10px',
      background: i === 1 ? 'var(--slate-100)' : 'transparent',
      border: 'none',
      borderRadius: 4,
      fontSize: 13,
      fontWeight: i === 1 ? 600 : 500,
      fontFamily: 'inherit',
      color: 'var(--fg-primary)',
      cursor: 'pointer'
    }
  }, r)))))));
}
Object.assign(window, {
  ClientInventoryPage,
  ClientRequestsPage,
  ClientApprovalsPage,
  ClientHistoryPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client/MoreClientPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/CycleCountsPage.jsx
try { (() => {
// Stoqr Operator — Cycle counts page (mobile-style scanner card + variance review)
function CycleCountsPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'Geist Mono',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "Cycle counts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 2
    }
  }, "3 in progress \xB7 28 closed this week \xB7 98.7% accuracy")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "sparkles"
  }, "Atlas: schedule"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "plus"
  }, "New count"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Count #2843 \xB7 Zone C",
    meta: /*#__PURE__*/React.createElement(StatusPill, {
      kind: "warning"
    }, "In progress")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Counted"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "48 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      fontWeight: 500
    }
  }, "/ 64 bins"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Variance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      color: '#D97706'
    }
  }, "2.1", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, "Counter"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      marginTop: 4
    }
  }, "Marcus L."))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--slate-100)',
      borderRadius: 9999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '75%',
      height: '100%',
      background: '#2563EB'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Variances \xB7 3"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(VarianceRow, {
    bin: "C-08-03",
    sku: "SKU-062014-AS",
    sys: 36,
    act: 14,
    delta: -22
  }), /*#__PURE__*/React.createElement(VarianceRow, {
    bin: "C-08-09",
    sku: "SKU-062018-AS",
    sys: 42,
    act: 48,
    delta: +6
  }), /*#__PURE__*/React.createElement(VarianceRow, {
    bin: "C-09-01",
    sku: "SKU-062032-AS",
    sys: 120,
    act: 114,
    delta: -6
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Scanner \xB7 live",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono',
        fontSize: 11,
        color: 'var(--fg-tertiary)'
      }
    }, "device_42")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--slate-900)',
      color: '#fff',
      borderRadius: 6,
      padding: 18,
      fontFamily: 'Geist Mono',
      fontSize: 12,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#94A3B8'
    }
  }, "[16:14:02]"), /*#__PURE__*/React.createElement("div", null, "scan\xA0\u2192\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#67E8F9'
    }
  }, "C-08-03")), /*#__PURE__*/React.createElement("div", null, "sku\xA0\xA0\u2192\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#67E8F9'
    }
  }, "SKU-062014-AS")), /*#__PURE__*/React.createElement("div", null, "sys\xA0\xA036\xA0\xB7\xA0count ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FCD34D'
    }
  }, "14")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#FCA5A5'
    }
  }, "variance \u221222 (61%) \u2014 flag"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#94A3B8',
      marginTop: 8
    }
  }, "[16:14:18]"), /*#__PURE__*/React.createElement("div", null, "recount? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#86EFAC'
    }
  }, "y"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "check"
  }, "Confirm"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "repeat"
  }, "Recount"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Skip")))));
}
function VarianceRow({
  bin,
  sku,
  sys,
  act,
  delta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1fr 60px 60px 60px',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono'
    }
  }, bin), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      color: 'var(--fg-secondary)'
    }
  }, sku), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      color: 'var(--fg-tertiary)'
    }
  }, sys), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontWeight: 500
    }
  }, act), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      color: delta < 0 ? '#DC2626' : '#16A34A',
      fontWeight: 600
    }
  }, delta > 0 ? '+' : '', delta));
}
Object.assign(window, {
  CycleCountsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/CycleCountsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/InventoryPage.jsx
try { (() => {
// Stoqr Operator — Inventory page (table, filters, bulk actions)
const {
  useState: useStateInv
} = React;
function InventoryPage() {
  const [selected, setSelected] = useStateInv(new Set([1]));
  const rows = [{
    id: 0,
    sku: 'SKU-049281-NV',
    name: 'Navigator backpack 30L',
    bin: 'A-12-03',
    wh: 'W-02',
    qty: 1240,
    d7: +128,
    status: 'success',
    lbl: 'OK'
  }, {
    id: 1,
    sku: 'SKU-049282-NV',
    name: 'Navigator backpack 45L',
    bin: 'A-12-04',
    wh: 'W-02',
    qty: 42,
    d7: -86,
    status: 'warning',
    lbl: 'Low'
  }, {
    id: 2,
    sku: 'SKU-051104-TR',
    name: 'Trail bottle 750ml — slate',
    bin: 'B-04-11',
    wh: 'W-04',
    qty: 0,
    d7: 0,
    status: 'danger',
    lbl: 'Out'
  }, {
    id: 3,
    sku: 'SKU-051105-TR',
    name: 'Trail bottle 750ml — sand',
    bin: 'B-04-12',
    wh: 'W-04',
    qty: 318,
    d7: -12,
    status: 'success',
    lbl: 'OK'
  }, {
    id: 4,
    sku: 'SKU-062013-AS',
    name: 'Ascent jacket M',
    bin: 'C-08-02',
    wh: 'W-02',
    qty: 86,
    d7: +4,
    status: 'success',
    lbl: 'OK'
  }, {
    id: 5,
    sku: 'SKU-062014-AS',
    name: 'Ascent jacket L',
    bin: 'C-08-03',
    wh: 'W-02',
    qty: 14,
    d7: -22,
    status: 'warning',
    lbl: 'Low'
  }, {
    id: 6,
    sku: 'SKU-070881-PB',
    name: 'Pebble headlamp',
    bin: 'D-01-09',
    wh: 'W-01',
    qty: 612,
    d7: +48,
    status: 'success',
    lbl: 'OK'
  }, {
    id: 7,
    sku: 'SKU-070882-PB',
    name: 'Pebble headlamp — red',
    bin: 'D-01-10',
    wh: 'W-01',
    qty: 0,
    d7: 0,
    status: 'danger',
    lbl: 'Out'
  }, {
    id: 8,
    sku: 'SKU-088100-CM',
    name: 'Camp stool — folding',
    bin: 'E-03-04',
    wh: 'W-04',
    qty: 240,
    d7: +12,
    status: 'success',
    lbl: 'OK'
  }];
  const toggle = id => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'Geist Mono',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "Inventory"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 2
    }
  }, "4,821 SKUs across 4 warehouses \xB7 synced 2 min ago")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "download",
    size: "sm"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "package-plus",
    size: "sm"
  }, "Receive"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 280
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 14,
      height: 14,
      position: 'absolute',
      left: 10,
      top: 9,
      color: 'var(--fg-tertiary)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Filter SKUs, names, bins\u2026",
    style: {
      width: '100%',
      height: 32,
      padding: '0 10px 0 30px',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      background: '#fff',
      fontSize: 13,
      fontFamily: 'inherit'
    }
  })), /*#__PURE__*/React.createElement(FilterChip, {
    icon: "warehouse"
  }, "Warehouse: All"), /*#__PURE__*/React.createElement(FilterChip, {
    icon: "circle-dot"
  }, "Status: Any"), /*#__PURE__*/React.createElement(FilterChip, {
    icon: "tag"
  }, "Category: All"), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 32,
      padding: '0 10px',
      background: 'transparent',
      border: '1px dashed var(--border-default)',
      color: 'var(--fg-secondary)',
      borderRadius: 6,
      fontSize: 12,
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 12,
      height: 12
    }
  }), "Add filter"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, "9 of 4,821")), selected.size > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#EFF6FF',
      border: '1px solid #BFDBFE',
      borderRadius: 6,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#1E40AF',
      fontWeight: 600
    }
  }, selected.size, " selected"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 16,
      background: '#BFDBFE'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "arrow-down-up"
  }, "Transfer"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "clipboard-check"
  }, "Cycle count"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "tag"
  }, "Tag"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setSelected(new Set())
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      overflow: 'hidden',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...gridCols,
      padding: '8px 14px',
      background: 'var(--slate-50)',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      accentColor: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("div", null, "SKU"), /*#__PURE__*/React.createElement("div", null, "Description"), /*#__PURE__*/React.createElement("div", null, "Bin"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "On hand"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "\u0394 7d"), /*#__PURE__*/React.createElement("div", null, "Status")), rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      ...gridCols,
      padding: '9px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 13,
      alignItems: 'center',
      background: selected.has(r.id) ? 'var(--slate-50)' : '#fff',
      borderLeft: selected.has(r.id) ? '2px solid #2563EB' : '2px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selected.has(r.id),
    onChange: () => toggle(r.id),
    style: {
      accentColor: '#2563EB'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12
    }
  }, r.sku), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, r.bin, " \xB7 ", r.wh), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontWeight: 500
    }
  }, r.qty.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      color: r.d7 > 0 ? '#16A34A' : r.d7 < 0 ? '#DC2626' : 'var(--fg-tertiary)'
    }
  }, r.d7 === 0 ? '—' : (r.d7 > 0 ? '+' : '') + r.d7), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusPill, {
    kind: r.status
  }, r.lbl))))));
}
function FilterChip({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      height: 32,
      padding: '0 10px',
      background: '#fff',
      border: '1px solid var(--border-default)',
      color: 'var(--fg-primary)',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-tertiary)'
    }
  }), children, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-tertiary)'
    }
  }));
}
const gridCols = {
  display: 'grid',
  gridTemplateColumns: '20px 140px 1fr 160px 90px 80px 90px',
  gap: 12
};
Object.assign(window, {
  InventoryPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/InventoryPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/MorePages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Stoqr Operator — Movements, Approvals, Agents, Warehouses, Team, Settings.
// Built from Shell.jsx primitives: Button, Card, Stat, StatusPill.

// ============================================================
// PAGE HEADER (shared)
// ============================================================
function PageHeader({
  eyebrow,
  title,
  sub,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'Geist Mono',
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.03em'
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, sub)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, actions));
}

// ============================================================
// MOVEMENTS
// ============================================================
function MovementsPage() {
  const [tab, setTab] = React.useState('all');
  const tabs = [{
    k: 'all',
    label: 'All',
    count: 38
  }, {
    k: 'inbound',
    label: 'Inbound',
    count: 9
  }, {
    k: 'outbound',
    label: 'Outbound',
    count: 12
  }, {
    k: 'transfer',
    label: 'Transfer',
    count: 14
  }, {
    k: 'adjust',
    label: 'Adjust',
    count: 3
  }];
  const rows = [{
    id: 'MV-104821',
    kind: 'transfer',
    sku: 'SKU-049281-NV',
    name: 'Navigator backpack 30L',
    from: 'W-02 · A-12-03',
    to: 'W-04 · B-03-11',
    qty: 240,
    status: 'running',
    who: 'Atlas',
    when: 'Now'
  }, {
    id: 'MV-104820',
    kind: 'inbound',
    sku: 'SKU-088144-CM',
    name: 'Camp pillow',
    from: 'PO-77291',
    to: 'W-02 · dock 3',
    qty: 600,
    status: 'pending',
    who: 'Marcus L.',
    when: '4m ago'
  }, {
    id: 'MV-104819',
    kind: 'outbound',
    sku: 'SKU-051104-TR',
    name: 'Trail bottle 750ml',
    from: 'W-04 · D-01-08',
    to: 'SO-44819',
    qty: 18,
    status: 'done',
    who: 'Priya K.',
    when: '12m ago'
  }, {
    id: 'MV-104818',
    kind: 'transfer',
    sku: 'SKU-062014-AS',
    name: 'Ascent jacket L',
    from: 'W-03 · F-22-01',
    to: 'W-02 · F-22-01',
    qty: 36,
    status: 'done',
    who: 'Atlas',
    when: '38m ago'
  }, {
    id: 'MV-104817',
    kind: 'adjust',
    sku: 'SKU-049282-NV',
    name: 'Navigator backpack 45L',
    from: 'W-02 · A-12-04',
    to: '—',
    qty: -4,
    status: 'flagged',
    who: 'Marcus L.',
    when: '1h ago'
  }, {
    id: 'MV-104816',
    kind: 'inbound',
    sku: 'SKU-049281-NV',
    name: 'Navigator backpack 30L',
    from: 'PO-77284',
    to: 'W-02 · dock 3',
    qty: 1200,
    status: 'done',
    who: 'Marcus L.',
    when: '2h ago'
  }, {
    id: 'MV-104815',
    kind: 'outbound',
    sku: 'SKU-088144-CM',
    name: 'Camp pillow',
    from: 'W-02 · C-08-01',
    to: 'SO-44814',
    qty: 60,
    status: 'done',
    who: 'Atlas',
    when: '3h ago'
  }, {
    id: 'MV-104814',
    kind: 'transfer',
    sku: 'SKU-051104-TR',
    name: 'Trail bottle 750ml',
    from: 'W-04 · D-01-08',
    to: 'W-01 · D-01-08',
    qty: 84,
    status: 'done',
    who: 'Priya K.',
    when: '4h ago'
  }];
  const kindIcon = {
    transfer: 'arrow-right-left',
    inbound: 'arrow-down-to-line',
    outbound: 'arrow-up-from-line',
    adjust: 'pencil'
  };
  const statusKind = {
    running: 'ai',
    pending: 'warning',
    done: 'success',
    flagged: 'danger'
  };
  const statusLabel = {
    running: 'Running',
    pending: 'Pending',
    done: 'Posted',
    flagged: 'Flagged'
  };
  const filtered = tab === 'all' ? rows : rows.filter(r => r.kind === tab);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Last 24 hours",
    title: "Movements",
    sub: "38 movements in flight across 4 warehouses \xB7 3 flagged.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "download"
    }, "Export"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "plus"
    }, "New movement"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Open",
    value: "38",
    delta: "\u22126",
    deltaKind: "down"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Posted today",
    value: "124",
    delta: "+12%",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Avg cycle time",
    value: "14",
    unit: "min",
    delta: "\u22122 min",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Flagged",
    value: "3",
    delta: "2 over SLA",
    deltaKind: "flat"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginBottom: 12,
      borderBottom: '1px solid var(--border-subtle)',
      margin: '-14px -14px 0'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    onClick: () => setTab(t.k),
    style: {
      height: 38,
      padding: '0 14px',
      border: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      color: tab === t.k ? 'var(--fg-primary)' : 'var(--fg-secondary)',
      borderBottom: `2px solid ${tab === t.k ? '#2563EB' : 'transparent'}`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, t.label, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--fg-tertiary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, t.count))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      padding: '0 14px',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "filter"
  }, "Filter"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "arrow-down-up"
  }, "Sort"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 -14px -14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 32px 1.4fr 1.6fr 80px 110px 110px',
      padding: '8px 14px',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "ID"), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "Item"), /*#__PURE__*/React.createElement("div", null, "From \u2192 To"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Qty"), /*#__PURE__*/React.createElement("div", null, "Status"), /*#__PURE__*/React.createElement("div", null, "When")), filtered.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 32px 1.4fr 1.6fr 80px 110px 110px',
      padding: '10px 14px',
      fontSize: 13,
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 5,
      background: 'var(--slate-100)',
      color: 'var(--slate-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": kindIcon[r.kind],
    style: {
      width: 12,
      height: 12
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: 500
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, r.sku)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--fg-secondary)',
      fontFamily: 'Geist Mono',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.from), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-muted)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.to)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontWeight: 600,
      color: r.qty < 0 ? '#DC2626' : 'inherit'
    }
  }, r.qty > 0 ? '+' : '', r.qty.toLocaleString()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusPill, {
    kind: statusKind[r.status]
  }, statusLabel[r.status])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, r.who, " \xB7 ", r.when))))));
}

// ============================================================
// APPROVALS
// ============================================================
function ApprovalsPage() {
  const queue = [{
    id: 'AP-2841',
    who: 'Atlas',
    ai: true,
    title: 'Transfer 240 units · W-02 → W-04',
    sla: 'overdue 6m',
    conf: 94,
    kind: 'transfer'
  }, {
    id: 'AP-2840',
    who: 'Marcus L.',
    ai: false,
    title: 'Adjust −18 units · SKU-051104-TR',
    sla: '22m left',
    kind: 'adjust'
  }, {
    id: 'AP-2839',
    who: 'Atlas',
    ai: true,
    title: 'Replenish bin C-08-03 · 60 units',
    sla: '1h left',
    conf: 88,
    kind: 'transfer'
  }, {
    id: 'AP-2838',
    who: 'Atlas',
    ai: true,
    title: 'Auto-route inbound dock 3 → zone D',
    sla: '2h left',
    conf: 99,
    kind: 'route'
  }, {
    id: 'AP-2837',
    who: 'Jess W.',
    ai: false,
    title: 'Override variance 7.4% · bin F-22-01',
    sla: '3h left',
    kind: 'adjust'
  }, {
    id: 'AP-2836',
    who: 'Atlas',
    ai: true,
    title: 'Open PO · 800 units · SKU-088144',
    sla: '4h left',
    conf: 76,
    kind: 'po'
  }, {
    id: 'AP-2835',
    who: 'Marcus L.',
    ai: false,
    title: 'Receive shipment SHP-22918 short by 12u',
    sla: '6h left',
    kind: 'inbound'
  }];
  const [sel, setSel] = React.useState(0);
  const cur = queue[sel];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "7 waiting \xB7 1 overdue",
    title: "Approvals",
    sub: "Human and agent-proposed actions awaiting your sign-off.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "filter"
    }, "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "archive"
    }, "Archive"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Queue",
    meta: "7 items"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, queue.map((q, i) => /*#__PURE__*/React.createElement("button", {
    key: q.id,
    onClick: () => setSel(i),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '12px 14px',
      border: 'none',
      background: sel === i ? 'var(--slate-50)' : '#fff',
      borderLeft: `2px solid ${sel === i ? '#2563EB' : 'transparent'}`,
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'inherit',
      textAlign: 'left',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 5,
      background: q.ai ? '#EDE9FE' : 'var(--slate-100)',
      color: q.ai ? '#7C3AED' : 'var(--slate-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: 10,
      fontWeight: 700
    }
  }, q.ai ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 11,
      height: 11
    }
  }) : q.who.split(' ').map(p => p[0]).join('')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1.35
    }
  }, q.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      marginTop: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono'
    }
  }, q.id), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, q.who), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: q.sla.includes('overdue') ? '#DC2626' : 'var(--fg-tertiary)',
      fontWeight: q.sla.includes('overdue') ? 600 : 400
    }
  }, q.sla))))))), /*#__PURE__*/React.createElement(Card, {
    accent: cur.ai ? 'ai' : null,
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, cur.ai && /*#__PURE__*/React.createElement("i", {
      "data-lucide": "sparkles",
      style: {
        width: 14,
        height: 14,
        color: '#7C3AED'
      }
    }), cur.title),
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'Geist Mono'
      }
    }, cur.id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    kind: cur.ai ? 'ai' : 'neutral'
  }, cur.ai ? `Atlas · ${cur.conf}% conf` : cur.who), /*#__PURE__*/React.createElement(StatusPill, {
    kind: cur.sla.includes('overdue') ? 'danger' : 'warning'
  }, cur.sla), /*#__PURE__*/React.createElement(StatusPill, {
    kind: "info"
  }, cur.kind)), cur.ai && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FAF5FF',
      border: '1px solid #E9D5FF',
      borderRadius: 6,
      padding: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#7C3AED',
      marginBottom: 6
    }
  }, "Atlas reasoning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.55
    }
  }, "30-day demand at the destination has grown 18% week-over-week. Source warehouse carries 4.3\xD7 safety stock. Proposed move reduces holding cost by ~$840/mo without affecting fill rate at the source. Confidence: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#7C3AED'
    }
  }, cur.conf, "%"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      rowGap: 10,
      columnGap: 14,
      fontSize: 13,
      padding: '4px 0 14px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "SKU"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono'
    }
  }, "SKU-049281-NV"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Item"), /*#__PURE__*/React.createElement("div", null, "Navigator backpack 30L"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Source"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono'
    }
  }, "W-02 \xB7 bin A-12-03"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Destination"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono'
    }
  }, "W-04 \xB7 bin B-03-11"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600
    }
  }, "240 units"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Window"), /*#__PURE__*/React.createElement("div", null, "May 5, 2026 \xB7 within 24h")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: cur.ai ? 'agent' : 'primary',
    icon: "check"
  }, "Approve & post"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "pencil"
  }, "Adjust"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Decline"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Use ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      background: 'var(--slate-100)',
      padding: '1px 5px',
      borderRadius: 3
    }
  }, "A"), " to approve \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      background: 'var(--slate-100)',
      padding: '1px 5px',
      borderRadius: 3
    }
  }, "D"), " to decline")))));
}

// ============================================================
// AGENTS
// ============================================================
function AgentsPage() {
  const agents = [{
    name: 'Atlas',
    role: 'Operations',
    color: '#7C3AED',
    status: 'running',
    runs: 1284,
    success: 98.7,
    sub: 'Replenishment, transfers, cycle counts.'
  }, {
    name: 'Helix',
    role: 'Receiving',
    color: '#0891B2',
    status: 'idle',
    runs: 642,
    success: 99.1,
    sub: 'Inbound routing, dock scheduling.'
  }, {
    name: 'Vault',
    role: 'Audit',
    color: '#16A34A',
    status: 'idle',
    runs: 318,
    success: 99.8,
    sub: 'Variance investigation, cycle audits.'
  }, {
    name: 'Pilot',
    role: 'Demand forecasting',
    color: '#D97706',
    status: 'paused',
    runs: 91,
    success: 92.4,
    sub: 'Replenishment proposals, PO drafts.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "4 active \xB7 1 paused",
    title: "Agents",
    sub: "Autonomous workers running on your behalf. Configure scope, approval rules, and escalations.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "book-open"
    }, "Docs"), /*#__PURE__*/React.createElement(Button, {
      variant: "agent",
      size: "sm",
      icon: "plus"
    }, "Add agent"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Runs today",
    value: "2,335",
    delta: "+8%",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Auto-resolved",
    value: "91",
    unit: "%",
    delta: "+2pp",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Awaiting approval",
    value: "5",
    delta: "\u22122",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Cost \xB7 today",
    value: "$12.40",
    delta: "of $50 budget",
    deltaKind: "flat"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, agents.map(a => /*#__PURE__*/React.createElement(Card, {
    key: a.name,
    accent: a.status === 'running' ? 'ai' : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: `linear-gradient(180deg, ${a.color}, ${shade(a.color, -0.18)})`,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '-0.02em'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, a.role), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    kind: a.status === 'running' ? 'ai' : a.status === 'paused' ? 'warning' : 'neutral'
  }, a.status))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 6,
      lineHeight: 1.5
    }
  }, a.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10,
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Mini, {
    label: "Runs (30d)",
    value: a.runs.toLocaleString()
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Success",
    value: `${a.success}%`
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Last run",
    value: a.status === 'running' ? 'Now' : a.status === 'paused' ? '3d ago' : '4m ago'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "settings"
  }, "Configure"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "history"
  }, "Runs"), a.status === 'paused' ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "play"
  }, "Resume") : /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "pause"
  }, "Pause"))))))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent agent runs",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 100px 1fr 110px 90px 80px',
      padding: '8px 14px',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Run"), /*#__PURE__*/React.createElement("div", null, "Agent"), /*#__PURE__*/React.createElement("div", null, "Action"), /*#__PURE__*/React.createElement("div", null, "Outcome"), /*#__PURE__*/React.createElement("div", null, "Duration"), /*#__PURE__*/React.createElement("div", null, "When")), [{
    id: 'r_01HK9X4ZQ7P',
    agent: 'Atlas',
    action: 'Recount bin A-12-03',
    outcome: 'running',
    dur: '—',
    t: 'Now'
  }, {
    id: 'r_01HK9X4Q12K',
    agent: 'Helix',
    action: 'Route inbound dock 3 → zone D',
    outcome: 'success',
    dur: '4.2s',
    t: '12m ago'
  }, {
    id: 'r_01HK9X4M77B',
    agent: 'Atlas',
    action: 'Suggest transfer W-02→W-04',
    outcome: 'awaiting',
    dur: '1.8s',
    t: '4m ago'
  }, {
    id: 'r_01HK9X4F33A',
    agent: 'Vault',
    action: 'Investigate variance bin F-22',
    outcome: 'success',
    dur: '11s',
    t: '38m ago'
  }, {
    id: 'r_01HK9X4A09Y',
    agent: 'Atlas',
    action: 'Replenish 4 bins · zone D',
    outcome: 'success',
    dur: '6.1s',
    t: '1h ago'
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 100px 1fr 110px 90px 80px',
      padding: '10px 14px',
      fontSize: 13,
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, r.id.slice(0, 10), "\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 11,
      height: 11,
      color: '#7C3AED'
    }
  }), r.agent), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.action), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusPill, {
    kind: r.outcome === 'success' ? 'success' : r.outcome === 'awaiting' ? 'warning' : 'ai'
  }, r.outcome)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.dur), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, r.t))))));
}
function Mini({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      fontFamily: 'Geist Mono',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 2
    }
  }, value));
}
function shade(hex, amt) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0, 2), 16) + Math.round(255 * amt)));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2, 4), 16) + Math.round(255 * amt)));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4, 6), 16) + Math.round(255 * amt)));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

// ============================================================
// WAREHOUSES
// ============================================================
function WarehousesPage() {
  const houses = [{
    code: 'W-01',
    name: 'Atlanta South',
    city: 'Atlanta, GA',
    status: 'online',
    skus: 1842,
    units: 38_120,
    cap: 0.62,
    agent: 'Helix',
    acc: 99.1
  }, {
    code: 'W-02',
    name: 'Houston North',
    city: 'Houston, TX',
    status: 'online',
    skus: 2104,
    units: 51_842,
    cap: 0.78,
    agent: 'Atlas',
    acc: 98.7
  }, {
    code: 'W-03',
    name: 'Reno East',
    city: 'Reno, NV',
    status: 'online',
    skus: 1118,
    units: 22_644,
    cap: 0.41,
    agent: 'Atlas',
    acc: 99.4
  }, {
    code: 'W-04',
    name: 'Newark Hub',
    city: 'Newark, NJ',
    status: 'attention',
    skus: 1422,
    units: 30_285,
    cap: 0.91,
    agent: 'Atlas',
    acc: 96.8
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "4 online \xB7 1 needs attention",
    title: "Warehouses",
    sub: "Capacity, accuracy, and assigned agents per facility.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "map"
    }, "Map view"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "plus"
    }, "Add warehouse"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 14
    }
  }, houses.map(h => /*#__PURE__*/React.createElement(Card, {
    key: h.code,
    accent: h.status === 'attention' ? null : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 6,
      background: 'var(--slate-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "warehouse",
    style: {
      width: 28,
      height: 28,
      color: 'var(--slate-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -6,
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Geist Mono',
      fontSize: 10,
      fontWeight: 700,
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      padding: '1px 5px',
      borderRadius: 3
    }
  }, h.code)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: '-0.02em'
    }
  }, h.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    kind: h.status === 'online' ? 'success' : 'warning'
  }, h.status))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, h.city), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Capacity"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'Geist Mono',
      fontSize: 12,
      fontWeight: 600,
      color: h.cap > 0.85 ? '#DC2626' : 'var(--fg-primary)'
    }
  }, Math.round(h.cap * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--slate-100)',
      borderRadius: 9999,
      marginTop: 5,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${h.cap * 100}%`,
      height: '100%',
      background: h.cap > 0.85 ? '#DC2626' : h.cap > 0.7 ? '#D97706' : '#16A34A'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10,
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Mini, {
    label: "SKUs",
    value: h.skus.toLocaleString()
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Units",
    value: h.units.toLocaleString()
  }), /*#__PURE__*/React.createElement(Mini, {
    label: "Accuracy",
    value: `${h.acc}%`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      color: '#7C3AED',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 11,
      height: 11
    }
  }), h.agent), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "\xB7 managing this site"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "arrow-up-right",
    style: {
      marginLeft: 'auto'
    }
  }, "Open"))))))));
}

// ============================================================
// TEAM
// ============================================================
function TeamPage() {
  const team = [{
    name: 'Priya Kapoor',
    email: 'priya@acme.co',
    role: 'Owner',
    wh: 'All',
    last: 'Now',
    seat: 'pro',
    init: 'PK',
    col: '#2563EB'
  }, {
    name: 'Marcus Lehman',
    email: 'marcus@acme.co',
    role: 'Ops manager',
    wh: 'W-02',
    last: '2m ago',
    seat: 'pro',
    init: 'ML',
    col: '#0891B2'
  }, {
    name: 'Jess Ward',
    email: 'jess@acme.co',
    role: 'Auditor',
    wh: 'W-03, W-04',
    last: '1h ago',
    seat: 'pro',
    init: 'JW',
    col: '#7C3AED'
  }, {
    name: 'Devin Park',
    email: 'devin@acme.co',
    role: 'Floor lead',
    wh: 'W-02',
    last: 'Yesterday',
    seat: 'std',
    init: 'DP',
    col: '#16A34A'
  }, {
    name: 'Sana Iqbal',
    email: 'sana@acme.co',
    role: 'Floor lead',
    wh: 'W-04',
    last: '3d ago',
    seat: 'std',
    init: 'SI',
    col: '#D97706'
  }, {
    name: 'Open invitation',
    email: 'lukas@acme.co',
    role: 'Floor lead',
    wh: 'W-01',
    last: '—',
    seat: 'pending',
    init: '?',
    col: 'var(--slate-400)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "5 active \xB7 1 invited",
    title: "Team",
    sub: "Members who can sign in to this Stoqr tenant.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: "shield"
    }, "Roles"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "user-plus"
    }, "Invite member"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Active members",
    value: "5"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Pending invites",
    value: "1"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Seats used",
    value: "6",
    unit: "of 10"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Members",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: "filter"
    }, "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: "download"
    }, "Export"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 100px 90px 40px',
      padding: '8px 14px',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Member"), /*#__PURE__*/React.createElement("div", null, "Role"), /*#__PURE__*/React.createElement("div", null, "Warehouses"), /*#__PURE__*/React.createElement("div", null, "Seat"), /*#__PURE__*/React.createElement("div", null, "Last active"), /*#__PURE__*/React.createElement("div", null)), team.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.email,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 100px 90px 40px',
      padding: '10px 14px',
      fontSize: 13,
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 6,
      background: m.col,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      flexShrink: 0,
      opacity: m.seat === 'pending' ? 0.6 : 1
    }
  }, m.init), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'Geist Mono'
    }
  }, m.email))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusPill, {
    kind: m.role === 'Owner' ? 'info' : m.role === 'Auditor' ? 'ai' : 'neutral',
    dot: false
  }, m.role)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, m.wh), /*#__PURE__*/React.createElement("div", null, m.seat === 'pending' ? /*#__PURE__*/React.createElement(StatusPill, {
    kind: "warning",
    dot: false
  }, "Invited") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, m.seat === 'pro' ? 'Pro' : 'Standard')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, m.last), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      border: '1px solid var(--border-subtle)',
      background: '#fff',
      borderRadius: 5,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 14,
      height: 14
    }
  })))))));
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsPage() {
  const [section, setSection] = React.useState('org');
  const sections = [{
    k: 'org',
    label: 'Organization',
    icon: 'building-2'
  }, {
    k: 'notifications',
    label: 'Notifications',
    icon: 'bell'
  }, {
    k: 'agents',
    label: 'Agent policy',
    icon: 'sparkles'
  }, {
    k: 'integrations',
    label: 'Integrations',
    icon: 'plug'
  }, {
    k: 'api',
    label: 'API & webhooks',
    icon: 'code'
  }, {
    k: 'billing',
    label: 'Billing',
    icon: 'credit-card'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Acme Co. \xB7 tenant_47291",
    title: "Settings",
    sub: "Tenant-wide configuration. Per-warehouse settings live on each warehouse page."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: 6,
      position: 'sticky',
      top: 70
    }
  }, sections.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.k,
    onClick: () => setSection(s.k),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 10px',
      border: 'none',
      background: section === s.k ? 'var(--slate-100)' : 'transparent',
      color: section === s.k ? 'var(--fg-primary)' : 'var(--fg-secondary)',
      fontWeight: section === s.k ? 600 : 500,
      fontFamily: 'inherit',
      fontSize: 13,
      borderRadius: 5,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon,
    style: {
      width: 14,
      height: 14
    }
  }), s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, section === 'org' && /*#__PURE__*/React.createElement(SettingsOrg, null), section === 'notifications' && /*#__PURE__*/React.createElement(SettingsNotifications, null), section === 'agents' && /*#__PURE__*/React.createElement(SettingsAgentPolicy, null), section === 'integrations' && /*#__PURE__*/React.createElement(SettingsIntegrations, null), section === 'api' && /*#__PURE__*/React.createElement(SettingsApi, null), section === 'billing' && /*#__PURE__*/React.createElement(SettingsBilling, null))));
}
function FieldRow({
  label,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: 14,
      padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 2,
      lineHeight: 1.45
    }
  }, hint)), /*#__PURE__*/React.createElement("div", null, children));
}
function Inp(props) {
  return /*#__PURE__*/React.createElement("input", _extends({}, props, {
    style: {
      width: '100%',
      height: 34,
      padding: '0 10px',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      fontSize: 13,
      fontFamily: 'inherit',
      background: '#fff',
      ...props.style
    }
  }));
}
function Toggle({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(!on),
    style: {
      width: 36,
      height: 20,
      borderRadius: 9999,
      padding: 2,
      border: 'none',
      cursor: 'pointer',
      background: on ? '#2563EB' : 'var(--slate-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: on ? 'flex-end' : 'flex-start',
      transition: 'all 180ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
    }
  }));
}
function SettingsOrg() {
  return /*#__PURE__*/React.createElement(Card, {
    title: "Organization"
  }, /*#__PURE__*/React.createElement(FieldRow, {
    label: "Tenant name",
    hint: "Shown in the sidebar and on tenant-facing exports."
  }, /*#__PURE__*/React.createElement(Inp, {
    defaultValue: "Acme Co."
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Tenant ID",
    hint: "Read-only. Used for API + webhook payloads."
  }, /*#__PURE__*/React.createElement(Inp, {
    readOnly: true,
    defaultValue: "tenant_47291_acme",
    style: {
      background: 'var(--slate-50)',
      color: 'var(--fg-secondary)'
    }
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Time zone",
    hint: "Used for SLAs, schedules, and cycle-count windows."
  }, /*#__PURE__*/React.createElement(Inp, {
    defaultValue: "America/Chicago"
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Default unit of measure"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      border: '1px solid var(--border-default)',
      borderRadius: 6,
      overflow: 'hidden'
    }
  }, ['Each', 'Case', 'Pallet'].map((u, i) => /*#__PURE__*/React.createElement("button", {
    key: u,
    style: {
      height: 32,
      padding: '0 14px',
      border: 'none',
      background: i === 0 ? 'var(--slate-100)' : '#fff',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: i === 0 ? 600 : 500,
      cursor: 'pointer',
      borderLeft: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, u)))), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Danger zone",
    hint: "These actions affect the entire tenant."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    size: "sm",
    icon: "trash-2"
  }, "Delete tenant")));
}
function SettingsNotifications() {
  const [n, setN] = React.useState({
    approvals: true,
    lowStock: true,
    agentRuns: false,
    digest: true,
    slack: true,
    email: true
  });
  const t = k => v => setN({
    ...n,
    [k]: v
  });
  return /*#__PURE__*/React.createElement(Card, {
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(FieldRow, {
    label: "Approval requests",
    hint: "When a user or agent needs your sign-off."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.approvals,
    onChange: t('approvals')
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Low stock",
    hint: "When any SKU drops below its reorder point."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.lowStock,
    onChange: t('lowStock')
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Agent runs",
    hint: "Every action an agent takes. Noisy."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.agentRuns,
    onChange: t('agentRuns')
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Daily digest",
    hint: "One summary at 8:00 AM local time."
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.digest,
    onChange: t('digest')
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Channels",
    hint: "Where to deliver notifications."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.email,
    onChange: t('email')
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "mail",
    style: {
      width: 14,
      height: 14,
      color: 'var(--fg-tertiary)'
    }
  }), "Email \xB7 priya@acme.co"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.slack,
    onChange: t('slack')
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "message-square",
    style: {
      width: 14,
      height: 14,
      color: 'var(--fg-tertiary)'
    }
  }), "Slack \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      color: 'var(--fg-secondary)'
    }
  }, "#ops-acme")))));
}
function SettingsAgentPolicy() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    accent: "ai",
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "sparkles",
      style: {
        width: 14,
        height: 14,
        color: '#7C3AED'
      }
    }), "Agent policy")
  }, /*#__PURE__*/React.createElement(FieldRow, {
    label: "Auto-approve threshold",
    hint: "Agents may execute actions without sign-off if confidence is at or above this."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    defaultValue: "95",
    style: {
      width: 80
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)'
    }
  }, "% confidence"))), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Max units per auto-action",
    hint: "Caps the unit volume an agent can move without approval."
  }, /*#__PURE__*/React.createElement(Inp, {
    defaultValue: "500",
    style: {
      width: 120
    }
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Allowed action types",
    hint: "Toggle the categories agents may perform on their own."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, [['Replenish', true], ['Transfer', true], ['Cycle count', true], ['Adjust', false], ['Open PO', false], ['Cancel order', false]].map(([l, on]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      border: '1px solid var(--border-default)',
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 500,
      background: on ? '#EDE9FE' : '#fff',
      color: on ? '#5B21B6' : 'var(--fg-secondary)',
      borderColor: on ? '#C4B5FD' : 'var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": on ? 'check' : 'plus',
    style: {
      width: 11,
      height: 11
    }
  }), l)))), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Escalation",
    hint: "Who to notify when an agent action is declined or fails."
  }, /*#__PURE__*/React.createElement(Inp, {
    defaultValue: "priya@acme.co, marcus@acme.co"
  }))));
}
function SettingsIntegrations() {
  const list = [{
    name: 'Shopify',
    status: 'connected',
    sub: 'Order sync · 2-way · 4m ago'
  }, {
    name: 'NetSuite',
    status: 'connected',
    sub: 'GL postings · 1-way · 12m ago'
  }, {
    name: 'ShipStation',
    status: 'connected',
    sub: 'Outbound labels · 38s ago'
  }, {
    name: 'Slack',
    status: 'connected',
    sub: '#ops-acme · webhooks'
  }, {
    name: 'QuickBooks',
    status: 'disconnected',
    sub: 'Not configured'
  }, {
    name: 'SAP S/4HANA',
    status: 'available',
    sub: 'Available on Enterprise'
  }];
  return /*#__PURE__*/React.createElement(Card, {
    title: "Integrations"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, list.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 6,
      background: 'var(--slate-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Geist Mono',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--slate-600)'
    }
  }, it.name.slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, it.sub)), /*#__PURE__*/React.createElement(StatusPill, {
    kind: it.status === 'connected' ? 'success' : it.status === 'disconnected' ? 'neutral' : 'info'
  }, it.status), /*#__PURE__*/React.createElement(Button, {
    variant: it.status === 'connected' ? 'secondary' : 'primary',
    size: "sm"
  }, it.status === 'connected' ? 'Manage' : it.status === 'disconnected' ? 'Connect' : 'Upgrade')))));
}
function SettingsApi() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    title: "API keys",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "plus"
    }, "New key")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, [{
    name: 'Production · server-to-server',
    last: 'today 4:12 PM',
    prefix: 'sk_live_4f2a'
  }, {
    name: 'Staging',
    last: 'Apr 28',
    prefix: 'sk_test_91xb'
  }].map(k => /*#__PURE__*/React.createElement("div", {
    key: k.prefix,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 110px 80px',
      padding: '12px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, k.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-tertiary)',
      marginTop: 2
    }
  }, k.prefix, "\u2026\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, "Last used ", k.last), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "copy"
  }, "Copy"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Revoke"))))), /*#__PURE__*/React.createElement(Card, {
    title: "Webhooks",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "plus"
    }, "Add endpoint")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, [{
    url: 'https://acme.co/hooks/stoqr',
    events: 'movement.*, approval.*',
    status: 'success'
  }, {
    url: 'https://ops.acme.co/at',
    events: 'agent.run.completed',
    status: 'warning'
  }].map(h => /*#__PURE__*/React.createElement("div", {
    key: h.url,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 110px 40px',
      padding: '12px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, h.url), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, h.events), /*#__PURE__*/React.createElement(StatusPill, {
    kind: h.status
  }, h.status === 'success' ? '200 OK' : '4 retries'), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      border: '1px solid var(--border-subtle)',
      background: '#fff',
      borderRadius: 5,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 14,
      height: 14
    }
  })))))));
}
function SettingsBilling() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    title: "Plan"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Current plan"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      fontFamily: 'Geist Mono',
      letterSpacing: '-0.02em',
      marginTop: 2
    }
  }, "Pro \xB7 $899/mo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, "Up to 10 seats, 4 warehouses, unlimited SKUs. Renews May 28, 2026.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "arrow-up-right"
  }, "Compare plans"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "trending-up"
  }, "Upgrade"))), /*#__PURE__*/React.createElement(Card, {
    title: "Usage this period",
    meta: "May 1 \u2013 May 5"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, [{
    l: 'Seats',
    v: 6,
    max: 10,
    unit: ''
  }, {
    l: 'Warehouses',
    v: 4,
    max: 4,
    unit: ''
  }, {
    l: 'Agent runs',
    v: 2335,
    max: 5000,
    unit: ''
  }].map(u => {
    const pct = Math.min(100, u.v / u.max * 100);
    const over = pct > 90;
    return /*#__PURE__*/React.createElement("div", {
      key: u.l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--fg-tertiary)'
      }
    }, u.l), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'Geist Mono',
        fontSize: 12,
        fontWeight: 600
      }
    }, u.v.toLocaleString(), " / ", u.max.toLocaleString())), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: 'var(--slate-100)',
        borderRadius: 9999,
        marginTop: 6,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct}%`,
        height: '100%',
        background: over ? '#DC2626' : '#2563EB'
      }
    })));
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Invoices",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '-14px'
    }
  }, [{
    id: 'INV-2026-04',
    date: 'Apr 28, 2026',
    amt: '$899.00',
    status: 'success'
  }, {
    id: 'INV-2026-03',
    date: 'Mar 28, 2026',
    amt: '$899.00',
    status: 'success'
  }, {
    id: 'INV-2026-02',
    date: 'Feb 28, 2026',
    amt: '$899.00',
    status: 'success'
  }].map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 110px 110px 80px',
      padding: '10px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      alignItems: 'center',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 12,
      color: 'var(--fg-secondary)'
    }
  }, i.id), /*#__PURE__*/React.createElement("div", null, i.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Geist Mono',
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, i.amt), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusPill, {
    kind: "success"
  }, "Paid")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "download"
  }, "PDF"))))));
}
Object.assign(window, {
  MovementsPage,
  ApprovalsPage,
  AgentsPage,
  WarehousesPage,
  TeamPage,
  SettingsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/MorePages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/OverviewPage.jsx
try { (() => {
// Stoqr Operator — Overview / dashboard page
function OverviewPage({
  onOpenAgent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Tuesday, May 5"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'Geist Mono',
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "Good morning, Priya."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-secondary)',
      marginTop: 2
    }
  }, "4 warehouses online \xB7 7 actions waiting on you \xB7 Atlas ran 3 cycle counts overnight.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "calendar"
  }, "May 5"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "plus"
  }, "New movement"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Total on hand",
    value: "142,891",
    unit: "units",
    delta: "+1.4%",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Open movements",
    value: "38",
    delta: "\u22126",
    deltaKind: "down"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Cycle accuracy",
    value: "98.7",
    unit: "%",
    delta: "+0.3pp",
    deltaKind: "up"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Awaiting approval",
    value: "7",
    delta: "3 over SLA",
    deltaKind: "flat"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Throughput \xB7 last 7 days",
    meta: "Units in / out per warehouse"
  }, /*#__PURE__*/React.createElement(ThroughputChart, null)), /*#__PURE__*/React.createElement(Card, {
    title: "Atlas activity",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        color: '#7C3AED'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        background: '#7C3AED',
        borderRadius: 9999
      }
    }), "Live"),
    accent: "ai"
  }, /*#__PURE__*/React.createElement(AgentFeed, {
    onOpen: onOpenAgent
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Approvals \xB7 7 waiting",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement(ApprovalRow, {
    who: "Atlas",
    what: "Transfer 240 units \xB7 W-02 \u2192 W-04",
    when: "4m ago",
    kind: "ai"
  }), /*#__PURE__*/React.createElement(ApprovalRow, {
    who: "Marcus L.",
    what: "Adjust \u221218 units \xB7 SKU-051104-TR",
    when: "22m ago",
    kind: "warning"
  }), /*#__PURE__*/React.createElement(ApprovalRow, {
    who: "Atlas",
    what: "Replenish bin C-08-03 \xB7 60 units",
    when: "1h ago",
    kind: "ai"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Low stock \xB7 across all warehouses",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement(LowStockRow, {
    sku: "SKU-049282-NV",
    name: "Navigator backpack 45L",
    qty: 42,
    reorder: 120
  }), /*#__PURE__*/React.createElement(LowStockRow, {
    sku: "SKU-062014-AS",
    name: "Ascent jacket L",
    qty: 14,
    reorder: 50
  }), /*#__PURE__*/React.createElement(LowStockRow, {
    sku: "SKU-088144-CM",
    name: "Camp pillow",
    qty: 28,
    reorder: 80
  }))));
}
function ThroughputChart() {
  const days = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
  const data = [[42, 68], [51, 72], [60, 80], [24, 30], [18, 22], [78, 90], [88, 72]];
  const max = 100;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 14,
      height: 160
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 3,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: `${d[0] / max * 100}%`,
      background: '#2563EB',
      borderRadius: '3px 3px 0 0'
    },
    title: "In"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: `${d[1] / max * 100}%`,
      background: '#1D97FF',
      borderRadius: '3px 3px 0 0'
    },
    title: "Out"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)',
      fontFamily: 'Geist Mono',
      textAlign: 'center'
    }
  }, days[i])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 12,
      fontSize: 11,
      color: 'var(--fg-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: '#2563EB',
      borderRadius: 2
    }
  }), "Inbound"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: '#1D97FF',
      borderRadius: 2
    }
  }), "Outbound"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'Geist Mono',
      fontSize: 10,
      color: 'var(--fg-tertiary)'
    }
  }, "units (\xD71k)")));
}
function AgentFeed({
  onOpen
}) {
  const items = [{
    t: 'Now',
    title: 'Recounting bin A-12-03',
    body: 'Variance trigger from yesterday\'s receive. Run started 4:14 PM.',
    running: true
  }, {
    t: '4m ago',
    title: 'Suggests transfer · W-02 → W-04',
    body: '240 units of SKU-049281, based on 30-day demand. Awaiting approval.',
    cta: 'Review'
  }, {
    t: '1h ago',
    title: 'Replenished 4 bins · zone D',
    body: 'Auto-routed from inbound dock 3. 642 units posted.',
    done: true
  }, {
    t: '3h ago',
    title: 'Closed cycle count #2841',
    body: 'Reconciled within tolerance. Variance 0.4%.',
    done: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      margin: '-14px -14px'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '10px 14px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      background: it.running ? 'rgba(124,58,237,0.06)' : '#fff',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 5,
      background: it.running ? '#7C3AED' : it.done ? '#16A34A' : '#EDE9FE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": it.done ? 'check' : 'sparkles',
    style: {
      width: 11,
      height: 11,
      color: it.done || it.running ? '#fff' : '#7C3AED'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      fontFamily: 'Geist Mono',
      flexShrink: 0
    }
  }, it.t)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      marginTop: 2,
      lineHeight: 1.45
    }
  }, it.body), it.cta && /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      marginTop: 6,
      background: 'transparent',
      border: 'none',
      color: '#7C3AED',
      fontWeight: 600,
      fontSize: 12,
      padding: 0,
      cursor: 'pointer'
    }
  }, it.cta, " \u2192")))));
}
function ApprovalRow({
  who,
  what,
  when,
  kind
}) {
  const isAI = kind === 'ai';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 5,
      background: isAI ? '#EDE9FE' : 'var(--slate-100)',
      color: isAI ? '#7C3AED' : 'var(--slate-700)',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, isAI ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 11,
      height: 11
    }
  }) : who.split(' ').map(p => p[0]).join('')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, who, " \xB7 ", when)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Approve"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Adjust"));
}
function LowStockRow({
  sku,
  name,
  qty,
  reorder
}) {
  const pct = Math.min(100, qty / reorder * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontFamily: 'Geist Mono',
      color: 'var(--fg-tertiary)'
    }
  }, sku)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--slate-100)',
      borderRadius: 9999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: '#D97706'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--fg-tertiary)',
      marginTop: 3,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums',
      fontFamily: 'Geist Mono'
    }
  }, qty, "/", reorder)));
}
Object.assign(window, {
  OverviewPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/OverviewPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/Shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Stoqr Operator — shared UI primitives
// Loaded as <script type="text/babel">. Exposes components on window.

const {
  useState
} = React;

// ============================================================
// Sidebar
// ============================================================
function Sidebar({
  active,
  onNav
}) {
  const items = [{
    k: 'overview',
    icon: 'layout-dashboard',
    label: 'Overview'
  }, {
    k: 'inventory',
    icon: 'package',
    label: 'Inventory',
    count: 4821
  }, {
    k: 'movements',
    icon: 'arrow-down-up',
    label: 'Movements'
  }, {
    k: 'cycle-counts',
    icon: 'clipboard-check',
    label: 'Cycle counts',
    count: 3
  }, {
    k: 'approvals',
    icon: 'check-circle-2',
    label: 'Approvals',
    count: 7,
    urgent: true
  }, {
    k: 'workflows',
    icon: 'workflow',
    label: 'Workflows'
  }, {
    k: 'agents',
    icon: 'sparkles',
    label: 'Agents',
    ai: true
  }];
  const settings = [{
    k: 'warehouses',
    icon: 'warehouse',
    label: 'Warehouses'
  }, {
    k: 'team',
    icon: 'users',
    label: 'Team'
  }, {
    k: 'settings',
    icon: 'settings',
    label: 'Settings'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: s.sidebar
  }, /*#__PURE__*/React.createElement("div", {
    style: s.brand
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/stoqr-mark.svg",
    style: {
      height: 22
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: s.brandText
  }, "stoqr"), /*#__PURE__*/React.createElement("span", {
    style: s.tenantBadge
  }, "Acme Co.")), /*#__PURE__*/React.createElement("div", {
    style: s.navGroup
  }, items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.k,
    item: it,
    active: active === it.k,
    onClick: () => onNav(it.k)
  }))), /*#__PURE__*/React.createElement("div", {
    style: s.navLabel
  }, "Configure"), /*#__PURE__*/React.createElement("div", {
    style: s.navGroup
  }, settings.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.k,
    item: it,
    active: active === it.k,
    onClick: () => onNav(it.k)
  }))), /*#__PURE__*/React.createElement("div", {
    style: s.userCard
  }, /*#__PURE__*/React.createElement("div", {
    style: s.avatar
  }, "PK"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Priya Kapoor"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)'
    }
  }, "Ops manager \xB7 W-02")), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-up",
    style: {
      width: 14,
      height: 14,
      color: 'var(--fg-tertiary)'
    }
  })));
}
function NavItem({
  item,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      ...s.navItem,
      ...(active ? s.navItemActive : {})
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": item.icon,
    style: {
      width: 16,
      height: 16,
      strokeWidth: 1.75,
      color: item.ai ? '#7C3AED' : 'currentColor'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'left'
    }
  }, item.label), item.count != null && /*#__PURE__*/React.createElement("span", {
    style: item.urgent ? s.countUrgent : s.count
  }, item.count.toLocaleString()));
}

// ============================================================
// Topbar
// ============================================================
function Topbar({
  title,
  breadcrumbs = [],
  onAgentToggle
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: s.topbar
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flex: 1,
      minWidth: 0
    }
  }, breadcrumbs.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-tertiary)',
      fontSize: 13
    }
  }, b), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 12,
      height: 12,
      color: 'var(--fg-muted)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 320
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 14,
      height: 14,
      position: 'absolute',
      left: 10,
      top: 9,
      color: 'var(--fg-tertiary)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search SKUs, bins, runs\u2026",
    style: s.searchInput
  }), /*#__PURE__*/React.createElement("span", {
    style: s.kbd
  }, "\u2318K")), /*#__PURE__*/React.createElement("button", {
    style: s.iconBtn
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onAgentToggle,
    style: s.agentBtn
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 14,
      height: 14
    }
  }), "Atlas"));
}

// ============================================================
// Status pill
// ============================================================
function StatusPill({
  kind = 'success',
  children,
  dot = true
}) {
  const map = {
    success: {
      bg: '#DCFCE7',
      bd: '#86EFAC',
      fg: '#166534',
      dot: '#16A34A'
    },
    warning: {
      bg: '#FEF3C7',
      bd: '#FCD34D',
      fg: '#854D0E',
      dot: '#D97706'
    },
    danger: {
      bg: '#FEE2E2',
      bd: '#FCA5A5',
      fg: '#991B1B',
      dot: '#DC2626'
    },
    info: {
      bg: '#CFFAFE',
      bd: '#67E8F9',
      fg: '#155E75',
      dot: '#0891B2'
    },
    ai: {
      bg: '#EDE9FE',
      bd: '#C4B5FD',
      fg: '#5B21B6',
      dot: '#7C3AED'
    },
    neutral: {
      bg: '#EEF2F7',
      bd: '#E2E8F0',
      fg: '#334155',
      dot: '#64748B'
    }
  };
  const c = map[kind];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: c.bg,
      border: `1px solid ${c.bd}`,
      color: c.fg,
      padding: '2px 8px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: c.dot,
      borderRadius: 9999
    }
  }), children);
}

// ============================================================
// Button
// ============================================================
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      h: 28,
      px: 10,
      fs: 12
    },
    md: {
      h: 34,
      px: 12,
      fs: 13
    },
    lg: {
      h: 40,
      px: 16,
      fs: 14
    }
  };
  const sz = sizes[size];
  const variants = {
    primary: {
      bg: '#2563EB',
      fg: '#fff',
      bd: 'transparent',
      shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
    },
    secondary: {
      bg: '#fff',
      fg: 'var(--fg-primary)',
      bd: 'var(--border-default)',
      shadow: 'none'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--fg-primary)',
      bd: 'transparent',
      shadow: 'none'
    },
    destructive: {
      bg: '#DC2626',
      fg: '#fff',
      bd: 'transparent',
      shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
    },
    agent: {
      bg: '#7C3AED',
      fg: '#fff',
      bd: 'transparent',
      shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
    }
  };
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      height: sz.h,
      padding: `0 ${sz.px}px`,
      fontSize: sz.fs,
      fontWeight: 600,
      fontFamily: 'inherit',
      background: v.bg,
      color: v.fg,
      border: `1px solid ${v.bd}`,
      borderRadius: 6,
      boxShadow: v.shadow,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer',
      ...rest.style
    }
  }), icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: sz.fs,
      height: sz.fs
    }
  }), children);
}

// ============================================================
// Card
// ============================================================
function Card({
  title,
  meta,
  actions,
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: `1px solid ${accent === 'ai' ? '#C4B5FD' : 'var(--border-subtle)'}`,
      borderRadius: 6,
      boxShadow: '0 1px 0 rgba(15,23,42,0.04)',
      overflow: 'hidden'
    }
  }, (title || meta) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, meta, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, children));
}

// ============================================================
// Stat tile
// ============================================================
function Stat({
  label,
  value,
  unit,
  delta,
  deltaKind = 'up'
}) {
  const deltaColor = deltaKind === 'up' ? '#16A34A' : deltaKind === 'down' ? '#DC2626' : 'var(--fg-tertiary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-tertiary)'
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 12,
      color: deltaColor,
      fontVariantNumeric: 'tabular-nums',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": deltaKind === 'up' ? 'trending-up' : 'trending-down',
    style: {
      width: 12,
      height: 12
    }
  }), delta, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "vs last week")));
}

// ============================================================
// Styles
// ============================================================
const s = {
  sidebar: {
    width: 248,
    height: '100vh',
    background: '#fff',
    borderRight: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 10px 10px',
    position: 'sticky',
    top: 0,
    gap: 4,
    flexShrink: 0
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '6px 8px 14px',
    borderBottom: '1px solid var(--border-subtle)',
    marginBottom: 10
  },
  brandText: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: '-0.02em'
  },
  tenantBadge: {
    marginLeft: 'auto',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    background: 'var(--slate-100)',
    color: 'var(--slate-700)',
    padding: '2px 5px',
    borderRadius: 4,
    whiteSpace: 'nowrap'
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    marginBottom: 14
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--fg-tertiary)',
    padding: '0 8px 6px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '7px 8px',
    border: 'none',
    background: 'transparent',
    color: 'var(--fg-secondary)',
    borderRadius: 5,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  navItemActive: {
    background: 'var(--slate-100)',
    color: 'var(--fg-primary)',
    fontWeight: 600
  },
  count: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--fg-tertiary)',
    fontVariantNumeric: 'tabular-nums'
  },
  countUrgent: {
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    background: '#DC2626',
    padding: '1px 6px',
    borderRadius: 9999
  },
  userCard: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    border: '1px solid var(--border-subtle)',
    borderRadius: 6,
    background: 'var(--slate-50)'
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 6,
    background: '#2563EB',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  topbar: {
    height: 56,
    borderBottom: '1px solid var(--border-subtle)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  searchInput: {
    width: '100%',
    height: 32,
    padding: '0 50px 0 30px',
    border: '1px solid var(--border-subtle)',
    borderRadius: 6,
    background: 'var(--slate-50)',
    fontSize: 13,
    fontFamily: 'inherit',
    outline: 'none'
  },
  kbd: {
    position: 'absolute',
    right: 8,
    top: 7,
    fontSize: 10,
    fontFamily: 'Geist Mono, monospace',
    color: 'var(--fg-tertiary)',
    background: '#fff',
    border: '1px solid var(--border-subtle)',
    padding: '1px 5px',
    borderRadius: 4
  },
  iconBtn: {
    width: 32,
    height: 32,
    border: '1px solid var(--border-subtle)',
    background: '#fff',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  agentBtn: {
    height: 32,
    padding: '0 12px',
    border: 'none',
    borderRadius: 6,
    background: 'linear-gradient(180deg,#7C3AED,#6D28D9)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
  }
};
Object.assign(window, {
  Sidebar,
  Topbar,
  StatusPill,
  Button,
  Card,
  Stat
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/WorkflowsPage.jsx
try { (() => {
// Stoqr Operator — Workflow builder canvas (agentic AI workflow)
function WorkflowsPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: 'calc(100vh - 56px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "Workflow \xB7 draft"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '2px 0 0',
      fontFamily: 'Geist Mono',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "Auto-replenish low stock")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      fontFamily: 'Geist Mono'
    }
  }, "Saved 12s ago"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "play"
  }, "Test run"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: "check"
  }, "Publish"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '220px 1fr 280px',
      gap: 0,
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      overflow: 'hidden',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: '1px solid var(--border-subtle)',
      padding: 12,
      background: 'var(--slate-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      marginBottom: 8
    }
  }, "Triggers"), /*#__PURE__*/React.createElement(Node, {
    icon: "zap",
    label: "Schedule"
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "bell",
    label: "Stock event"
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "webhook",
    label: "Webhook"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      margin: '14px 0 8px'
    }
  }, "Actions"), /*#__PURE__*/React.createElement(Node, {
    icon: "arrow-down-up",
    label: "Transfer stock"
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "package-plus",
    label: "Create PO"
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "clipboard-check",
    label: "Cycle count"
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "user-check",
    label: "Request approval"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      margin: '14px 0 8px'
    }
  }, "Agents"), /*#__PURE__*/React.createElement(Node, {
    icon: "sparkles",
    label: "Atlas \u2014 decide",
    ai: true
  }), /*#__PURE__*/React.createElement(Node, {
    icon: "sparkles",
    label: "Atlas \u2014 explain",
    ai: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      backgroundImage: 'linear-gradient(var(--slate-200) 1px, transparent 1px), linear-gradient(90deg, var(--slate-200) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      backgroundPosition: '-1px -1px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FlowNode, {
    x: 40,
    y: 40,
    icon: "bell",
    title: "When stock falls below",
    sub: "reorder threshold",
    kind: "trigger"
  }), /*#__PURE__*/React.createElement(FlowEdge, {
    x1: 184,
    y1: 66,
    x2: 260,
    y2: 130
  }), /*#__PURE__*/React.createElement(FlowNode, {
    x: 260,
    y: 104,
    icon: "sparkles",
    title: "Atlas decides",
    sub: "rebalance vs purchase",
    kind: "agent"
  }), /*#__PURE__*/React.createElement(FlowEdge, {
    x1: 404,
    y1: 130,
    x2: 480,
    y2: 194
  }), /*#__PURE__*/React.createElement(FlowNode, {
    x: 480,
    y: 168,
    icon: "user-check",
    title: "Request approval",
    sub: "if cost > $5,000",
    kind: "action"
  }), /*#__PURE__*/React.createElement(FlowEdge, {
    x1: 624,
    y1: 194,
    x2: 700,
    y2: 258
  }), /*#__PURE__*/React.createElement(FlowNode, {
    x: 700,
    y: 232,
    icon: "arrow-down-up",
    title: "Execute transfer",
    sub: "post movement",
    kind: "action"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      display: 'flex',
      gap: 4,
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 6,
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: zb
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "minus",
    style: ic
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Geist Mono',
      fontSize: 11,
      color: 'var(--fg-tertiary)',
      alignSelf: 'center',
      padding: '0 6px'
    }
  }, "100%"), /*#__PURE__*/React.createElement("button", {
    style: zb
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: ic
  })), /*#__PURE__*/React.createElement("button", {
    style: zb
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "maximize",
    style: ic
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--border-subtle)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 5,
      background: '#7C3AED',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 12,
      height: 12,
      color: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, "Atlas decides"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10,
      fontFamily: 'Geist Mono',
      color: 'var(--fg-tertiary)'
    }
  }, "node_3")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-secondary)',
      lineHeight: 1.5,
      marginBottom: 14
    }
  }, "The agent decides whether to rebalance from another warehouse or create a purchase order, based on cost, lead time, and projected demand."), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Inputs"
  }, /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "SKU"), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "quantity"), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "warehouse"), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "+ 2")), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Confidence floor"
  }, /*#__PURE__*/React.createElement("input", {
    value: "80%",
    readOnly: true,
    style: smallInput
  })), /*#__PURE__*/React.createElement(FieldRow, {
    label: "On low confidence"
  }, /*#__PURE__*/React.createElement("select", {
    style: smallInput
  }, /*#__PURE__*/React.createElement("option", null, "Request approval"))), /*#__PURE__*/React.createElement(FieldRow, {
    label: "Outputs"
  }, /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "action"), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "reasoning"), /*#__PURE__*/React.createElement("span", {
    style: chip
  }, "confidence")))));
}
function Node({
  icon,
  label,
  ai
}) {
  return /*#__PURE__*/React.createElement("div", {
    draggable: true,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 9px',
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 500,
      marginBottom: 5,
      cursor: 'grab',
      color: ai ? '#5B21B6' : 'var(--fg-primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 14,
      height: 14,
      color: ai ? '#7C3AED' : 'var(--fg-secondary)',
      strokeWidth: 1.75
    }
  }), label);
}
function FlowNode({
  x,
  y,
  icon,
  title,
  sub,
  kind
}) {
  const colors = {
    trigger: {
      bg: '#EFF6FF',
      bd: '#BFDBFE',
      ic: '#1E40AF'
    },
    action: {
      bg: '#fff',
      bd: 'var(--border-default)',
      ic: 'var(--fg-primary)'
    },
    agent: {
      bg: '#FAF5FF',
      bd: '#C4B5FD',
      ic: '#7C3AED'
    }
  }[kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: 144,
      padding: 10,
      background: colors.bg,
      border: `1px solid ${colors.bd}`,
      borderRadius: 6,
      boxShadow: '0 1px 2px rgba(15,23,42,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 12,
      height: 12,
      color: colors.ic,
      strokeWidth: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: colors.ic
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg-secondary)'
    }
  }, sub));
}
function FlowEdge({
  x1,
  y1,
  x2,
  y2
}) {
  const left = Math.min(x1, x2),
    top = Math.min(y1, y2);
  const w = Math.abs(x2 - x1),
    h = Math.abs(y2 - y1) || 1;
  return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      left,
      top,
      width: w,
      height: h,
      pointerEvents: 'none',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: `M0 0 C ${w * 0.5} 0, ${w * 0.5} ${h}, ${w} ${h}`,
    stroke: "#94A3B8",
    strokeWidth: "1.5",
    fill: "none"
  }));
}
function FieldRow({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)',
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4
    }
  }, children));
}
const chip = {
  background: '#EFF6FF',
  color: '#1E40AF',
  border: '1px solid #BFDBFE',
  padding: '2px 8px',
  borderRadius: 4,
  fontFamily: 'Geist Mono',
  fontSize: 11
};
const smallInput = {
  width: '100%',
  height: 28,
  padding: '0 8px',
  border: '1px solid var(--border-default)',
  borderRadius: 5,
  background: '#fff',
  fontSize: 12,
  fontFamily: 'inherit'
};
const zb = {
  width: 24,
  height: 24,
  border: 'none',
  background: 'transparent',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};
const ic = {
  width: 12,
  height: 12,
  color: 'var(--fg-secondary)'
};
Object.assign(window, {
  WorkflowsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/WorkflowsPage.jsx", error: String((e && e.message) || e) }); }

})();
