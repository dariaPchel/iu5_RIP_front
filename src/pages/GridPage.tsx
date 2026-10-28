import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_RISK_FACTORS } from '../modules/mock';
import type { RiskFactor } from '../modules/mock';
import { AgeFilter } from '../components/AgeFilter';
import { RiskCard } from '../components/RiskCard';

export const GridPage = () => {
  const navigate = useNavigate();
  const [maxAge, setMaxAge] = useState<number>(50);
  const [filteredFactors, setFilteredFactors] = useState<RiskFactor[]>(MOCK_RISK_FACTORS);

  const handleApply = () => {
    setFilteredFactors(MOCK_RISK_FACTORS.filter((f) => f.age <= maxAge));
  };

  const handleCardClick = (id: number) => navigate(`/risk_factors_feed/${id}`);

  return (
    <div className="grid-container">
      <AgeFilter maxAge={maxAge} onChange={setMaxAge} onApply={handleApply} />

      <div className="grid-cards">
        {filteredFactors.length === 0 && (
          <p className="grid-empty">Нет карточек для возраста до {maxAge} лет</p>
        )}
        {filteredFactors.map((factor) => (
          <RiskCard key={factor.id} factor={factor} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};