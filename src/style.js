import { css } from 'lit';

const style = css`
  .light-entity-card {
    padding: 16px;
  }

  .light-entity-child-card {
    box-shadow: none !important;
    padding: 0 !important;
  }

  .light-entity-card.group {
    padding-bottom: 5px;
    padding-top: 0;
  }

  .ha-slider-full-width ha-slider {
    flex: 1;
    min-width: 0;
  }

  .percent-slider {
    color: var(--primary-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    min-width: 40px;
  }

  .light-entity-card__header {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: var(--primary-text-color);
  }

  .light-entity-card-sliders > div {
    margin-top: 14px;
  }

  .group .light-entity-card-sliders > div {
    margin-top: 0;
  }

  .light-entity-card__color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .light-entity-card__color-picker ha-hs-color-picker {
    max-width: 300px;
    width: 100%;
  }

  .light-entity-card-color_temp {
    background-image: var(--ha-slider-background, linear-gradient(to right, #a6d1ff, #ffb74d));
    border-radius: 4px;
  }

  .light-entity-card-color_temp--kelvin {
    background-image: var(--ha-slider-background, linear-gradient(to right, #ffb74d, #a6d1ff));
  }

  .light-entity-card-effectlist {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .group .light-entity-card-effectlist {
    padding-bottom: 20px;
  }

  .light-entity-card-center {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .light-entity-card__mode-toggle {
    display: flex;
    justify-content: center;
    margin: 10px 0 4px;
  }

  .light-entity-card__mode-btn {
    padding: 6px 20px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--primary-text-color, #212121);
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
    outline: none;
  }

  .light-entity-card__mode-btn:first-child {
    border-radius: 16px 0 0 16px;
  }

  .light-entity-card__mode-btn:last-child {
    border-radius: 0 16px 16px 0;
  }

  .light-entity-card__mode-btn + .light-entity-card__mode-btn {
    border-left: none;
  }

  .light-entity-card__mode-btn--active {
    background: var(--primary-color, #03a9f4);
    color: white;
    border-color: var(--primary-color, #03a9f4);
  }

  .light-entity-card__mode-btn:hover:not(.light-entity-card__mode-btn--active) {
    background: rgba(0, 0, 0, 0.05);
  }

  .light-entity-card__color-dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin: 12px 8px 6px;
    padding: 4px;
  }

  .light-entity-card__color-dot {
    width: 38px;
    min-width: 28px;
    height: 38px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    outline: none;
    padding: 0;
  }

  .light-entity-card__color-dot:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .light-entity-card__color-dot--selected {
    border-color: white;
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .light-entity-card__rgb-view-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px 0 8px;
  }

  .light-entity-card__rgb-view-label {
    font-size: 13px;
    color: var(--secondary-text-color, #727272);
  }
`;

export default style;
