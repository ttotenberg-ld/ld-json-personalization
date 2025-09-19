import { useState, useEffect } from 'react'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import Header from './components/Header'
import CountrySelector from './components/CountrySelector'
import MainContent from './components/MainContent'
import './App.css'

function App({ flags, ldClient }) {
  const [config, setConfig] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}config.json`)
      .then(response => response.json())
      .then(data => {
        setConfig(data)
        setSelectedCountry(data.countries.default)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to load config:', error)
        setLoading(false)
      })
  }, [])

  // Get the current language from LaunchDarkly configLocalization flag
  const getCurrentLanguage = () => {
    return flags?.configLocalization?.language || 'en'
  }

  // Build country options from config
  const countryOptions = config?.countries?.available || []

  // Logo mapping for LaunchDarkly flag values
  const logoMap = {
    'anthropic_1': `${import.meta.env.BASE_URL}logos/anthropic_1.png`,
    'anthropic_2': `${import.meta.env.BASE_URL}logos/anthropic_2.png`
  };

  // Derive theme from LaunchDarkly configTheme flag and config fallback
  const getTheme = () => {
    const flagTheme = flags?.configTheme || {};
    const configTheme = config?.theme || {};
    
    // Merge config theme with flag theme, with flag taking precedence
    return {
      ...configTheme,
      ...flagTheme,
      logo: flagTheme.logo ? logoMap[flagTheme.logo] : configTheme?.logo
    };
  };

  const theme = getTheme();

  // Keep LD context in sync with selected country so configLocalization evaluates correctly
  useEffect(() => {
    if (!ldClient || !selectedCountry) return
    try {
      const current = ldClient.getContext?.() || {}
      ldClient.identify({
        ...current,
        country: selectedCountry
      })
    } catch (e) {
      console.warn('Failed to update LD context', e)
    }
  }, [selectedCountry, ldClient])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!config) {
    return <div className="error">Failed to load configuration</div>
  }

  return (
    <div className="app" style={{ '--accent-color': theme?.accent_color || theme?.accentColor }}>
      <Header theme={theme} flags={flags} />
      <div className="app-content">
        <div className="controls">
          <CountrySelector
            options={countryOptions}
            selectedCode={selectedCountry}
            onChange={setSelectedCountry}
            label={flags?.configLocalization?.ui?.selectorLabel || 'Country:'}
          />
        </div>
        <MainContent
          theme={theme}
          flags={flags}
          selectedCountry={selectedCountry}
          currentLanguage={getCurrentLanguage()}
          countries={countryOptions}
        />
      </div>
    </div>
  )
}

export default withLDConsumer()(App)