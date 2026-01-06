/**
 * Vulnerability Comparison Component
 * Allows users to compare multiple vulnerabilities side by side
 */

import React from 'react';
import { useVulnerability } from '../../context/VulnerabilityContext';
import './Comparison.css';

const Comparison: React.FC = () => {
  const { selectedVulnerabilities, clearSelection } = useVulnerability();

  if (selectedVulnerabilities.length === 0) {
    return (
      <div className="comparison-container empty">
        <h3>Vulnerability Comparison</h3>
        <p>Select vulnerabilities from the list to compare them</p>
      </div>
    );
  }

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h3>Comparing {selectedVulnerabilities.length} Vulnerabilities</h3>
        <button onClick={clearSelection} className="clear-button">
          Clear Selection
        </button>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Property</th>
              {selectedVulnerabilities.map((vuln) => (
                <th key={vuln.cve}>{vuln.cve}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="property-name">Severity</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>
                  <span className={`severity-badge ${vuln.severity}`}>
                    {vuln.severity}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="property-name">CVSS Score</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>{vuln.cvss}</td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Package</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>
                  {vuln.packageName} ({vuln.packageVersion})
                </td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Status</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>{vuln.status}</td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Published</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>{vuln.published}</td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Fix Date</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>{vuln.fixDate || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="property-name">AI Status</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>
                  {vuln.kaiStatus ? (
                    <span className="kai-status">{vuln.kaiStatus}</span>
                  ) : (
                    'Manual'
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Risk Factors</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve}>
                  <ul className="risk-factors-list">
                    {Object.keys(vuln.riskFactors).map((rf) => (
                      <li key={rf}>{rf}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="property-name">Description</td>
              {selectedVulnerabilities.map((vuln) => (
                <td key={vuln.cve} className="description-cell">
                  {vuln.description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparison;
