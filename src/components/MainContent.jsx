import './MainContent.css'

function MainContent({ theme, flags, selectedCountry, currentLanguage, countries }) {
  const currentCountryData = countries.find(opt => opt.code === selectedCountry)

  // Derive localization from LaunchDarkly flag with safe fallbacks
  const loc = flags?.configLocalization || {}
  const content = loc.content || {}
  const ui = loc.ui || {}

  const welcome = content.welcome || 'Welcome to our platform!'
  const description = content.description || 'This is a demonstration of language switching and theme customization.'
  const features = Array.isArray(content.features) && content.features.length > 0
    ? content.features
    : [
        'Real-time configuration changes without code deployments',
        'Fault-tolerant delivery with automatic failover mechanisms',
        'Enterprise-grade security and scale, delivering >40 Trillion flags daily',
        'Detailed analytics for all configurations and flags',
        'Lightning-fast flag evaluations with edge caching worldwide'
      ]

  const currentSettingsHeading = ui.currentSettingsHeading || 'Current Settings'
  const featuresHeading = ui.featuresHeading || 'Features:'
  const selectorLabel = ui.selectorLabel || 'Country:'
  const labels = ui.settingLabels || {}

  return (
    <main className="main-content">
      <div className="content-section">
        <h2 className="welcome-title">{welcome}</h2>
        <p className="description">{description}</p>

        <div className="features">
          <h3>{featuresHeading}</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="settings-display">
        <h3>{currentSettingsHeading}</h3>
        <div className="settings-grid">
          <div className="setting-item">
            <strong>{labels.country || 'Country:'}</strong>
            <span className="setting-value">
              {currentCountryData?.flag} {currentCountryData?.name}
            </span>
          </div>
          <div className="setting-item">
            <strong>{labels.accentColor || 'Accent Color:'}</strong>
            <span
              className="color-preview"
              style={{ backgroundColor: theme?.accent_color || theme?.accentColor }}
            ></span>
            <span className="setting-value">{theme?.accent_color || theme?.accentColor}</span>
          </div>
          <div className="setting-item">
            <strong>{labels.tagline || 'Tagline:'}</strong>
            <span className="setting-value">"{theme?.tagline}"</span>
          </div>
          <div className="setting-item">
            <strong>{labels.logoUrl || 'Logo URL:'}</strong>
            <span className="setting-value">{theme?.logo || 'None'}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContent