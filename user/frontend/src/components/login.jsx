import React from 'react'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const validate = () => {
    setError(null)
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) return 'Please enter a valid email address.'
    if (password.trim().length < 6) return 'Password must be at least 6 characters.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) {
      setError(v)
      setSuccess(null)
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 900))
      setSuccess('Signed in successfully.')
    } catch (err) {
      setError('Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const cardRef = React.useRef(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      setVisible(true)
      return
    }
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const styles = {
    page: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage:
        'url("https://assets.entrepreneur.com/content/3x2/2000/20171103074758-countryside-2326787-1920.jpeg")',
      backgroundColor: '#1867b6',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Inter, Roboto, system-ui, -apple-system, "Segoe UI", Arial',
    },
    card: {
      width: '100%',
      color:"white",
      maxWidth: '420px',
      background: 'transparent',
      borderRadius: 10,
      boxShadow: '0 6px 21px black',
      padding: 28,
      boxSizing: 'border-box',
    },
    header: { marginBottom: 20, textAlign: 'left' },
    title: { margin: 0, fontSize: 22, fontWeight: 700, color: 'white' },
    subtitle: { margin: '6px 0 0', fontSize: 15, color: 'white',fontWeight:600 },
    form: { display: 'grid', gap: 14, marginTop: 16 },
    label: { display: 'block', fontSize: 16, color: 'white', marginBottom: 6,fontWeight:600 },
    input: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: 8,
      color:'green',
      border: '1px solid #e6eef8',
      fontSize: 14,
      outline: 'none',
      boxSizing: 'border-box',
      background: '#fbfdff',
    },
    inputFocus: {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 4px rgba(37,99,235,0.06)',
    },
    button: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: 8,
      border: 'none',
      background: '#2563eb',
      color: '#fff',
      fontWeight: 600,
      fontSize: 15,
      cursor: 'pointer',
    },
    meta: { marginTop: 12, fontSize: 14, color: '#475569', textAlign: 'center',fontWeight:600 },
    error: { color: '#dc2626', fontSize: 13 },
    success: { color: '#059669', fontSize: 13 },
  }

  const cardStyle = {
    ...styles.card,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    opacity: visible ? 1 : 0,
    transition: prefersReducedMotion ? 'none' : 'transform 1s ease, opacity 1s ease',
  }

  return (
    <div style={styles.page}>
      <div ref={cardRef} style={cardStyle} role="region" aria-label="Sign in">
        <header style={styles.header}>
          <h1 style={styles.title}>Log in to your account</h1>
          <p style={styles.subtitle}>Enter your email and password</p>
        </header>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              aria-required="true"
            />
          </div>

          <div>
            <button
              type="submit"
              style={styles.button}
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? 'Signing in…' : 'Log in'}
            </button>
          </div>

          <div style={{ marginTop: 8 }}>
            {error && (
              <div role="alert" aria-live="assertive" style={styles.error}>
                {error}
              </div>
            )}
            {success && (
              <div role="status" aria-live="polite" style={styles.success}>
                {success}
              </div>
            )}
          </div>
        </form>

        <div style={styles.meta}></div>
          <small>Secure access — your credentials are encrypted.</small>
        </div>
    </div>
    
  )
}

export default Login;
