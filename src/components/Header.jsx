import './Header.css'
import { withLDConsumer } from 'launchdarkly-react-client-sdk';

// Logo mapping for LaunchDarkly flag values
const logoMap = {
  'anthropic_1': `${import.meta.env.BASE_URL}logos/anthropic_1.png`,
  'anthropic_2': `${import.meta.env.BASE_URL}logos/anthropic_2.png`
};

const Header = ({ theme, flags }) => {
  // Parse the configTheme flag - it should be JSON with structure:
  // { "accent_color": "#007bff", "logo": "anthropic_1", "tagline": "Welcome!" }
  const flagTheme = flags?.configTheme || {};
  
  // Merge flag theme with local theme, with flag taking precedence
  const mergedTheme = {
    ...theme,
    ...flagTheme,
    logo: flagTheme.logo ? logoMap[flagTheme.logo] : theme?.logo
  };

  return (
    <header 
      className="header"
      style={{
        '--accent-color': mergedTheme.accent_color || mergedTheme.accentColor || '#007bff'
      }}
    >
      <div className="header-content">
        <div className="logo">
          {mergedTheme?.logo ? (
            <img src={mergedTheme.logo} alt="Logo" className="logo-image" />
          ) : (
            <div className="logo-placeholder">LOGO</div>
          )}
        </div>
        <h1 className="tagline">{mergedTheme?.tagline || 'Welcome'}</h1>
      </div>
    </header>
  )
}

export default Header