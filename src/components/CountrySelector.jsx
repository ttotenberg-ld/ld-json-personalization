import { useState, useMemo } from 'react'
import './CountrySelector.css'

function CountrySelector({ options, selectedCode, onChange, label = 'Country:' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedOption = options.find(opt => opt.code === selectedCode)

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options
    return options.filter(opt => 
      opt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opt.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm])

  const handleSelect = (code) => {
    onChange(code)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchTerm('')
    }
  }

  return (
    <div className="country-selector">
      <label className="selector-label">{label}</label>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span className="flag">{selectedOption?.flag}</span>
          <span className="country-name">{selectedOption?.name}</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
            <div className="dropdown-items">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.code}
                    className={`dropdown-item ${opt.code === selectedCode ? 'active' : ''}`}
                    onClick={() => handleSelect(opt.code)}
                  >
                    <span className="flag">{opt.flag}</span>
                    <span className="country-name">{opt.name}</span>
                  </button>
                ))
              ) : (
                <div className="no-results">No countries found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CountrySelector


