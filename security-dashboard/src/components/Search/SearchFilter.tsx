/**
 * Search and Filter Panel
 * Provides interface for filtering vulnerabilities by various criteria
 */

import React, { useState, useEffect } from 'react';
import { useVulnerability } from '../../context/VulnerabilityContext';
import { useDebounce } from '../../hooks/useDebounce';
import { getUniqueValues } from '../../utils/dataUtils';
import './SearchFilter.css';

const SearchFilter: React.FC = () => {
  const { filters, setFilters, allVulnerabilities } = useVulnerability();
  const [searchInput, setSearchInput] = useState(filters.searchTerm);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Update filters when debounced search changes
  useEffect(() => {
    setFilters({ ...filters, searchTerm: debouncedSearch });
  }, [debouncedSearch]);

  // Generate search suggestions based on CVEs
  useEffect(() => {
    if (searchInput.length > 2) {
      const cves = getUniqueValues(allVulnerabilities, 'cve');
      const filtered = cves
        .filter((cve) => cve.toLowerCase().includes(searchInput.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, allVulnerabilities]);

  const handleSeverityChange = (severity: string) => {
    const newSeverities = filters.severity.includes(severity)
      ? filters.severity.filter((s) => s !== severity)
      : [...filters.severity, severity];
    setFilters({ ...filters, severity: newSeverities });
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  };

  const handleReset = () => {
    setSearchInput('');
    setFilters({
      severity: [],
      kaiStatus: [],
      searchTerm: '',
      packageName: '',
      dateRange: { start: '', end: '' },
    });
  };

  return (
    <div className="search-filter-panel">
      <h2>Search & Filter</h2>

      {/* Search Input */}
      <div className="filter-section">
        <label>Search</label>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search by CVE, description, or package name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchInput(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Severity Filter */}
      <div className="filter-section">
        <label>Severity</label>
        <div className="checkbox-group">
          {['critical', 'high', 'medium', 'low'].map((severity) => (
            <label key={severity} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.severity.includes(severity)}
                onChange={() => handleSeverityChange(severity)}
              />
              <span className={`severity-badge ${severity}`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="filter-section">
        <label>Published Date Range</label>
        <div className="date-range">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            placeholder="Start date"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            placeholder="End date"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button onClick={handleReset} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
};

export default SearchFilter;
