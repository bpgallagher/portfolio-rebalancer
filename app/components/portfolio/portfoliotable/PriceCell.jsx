import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import EditorMoneyOff from 'material-ui/svg-icons/editor/money-off';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import PriceProgress from './PriceProgress';
import styles from '../../../css/components/portfolio/portfolio-table/price-cell';

const cx = classNames.bind(styles);

const PriceCell = ({index, price, priceSelect, securityTextFieldChange, fetchPrice, currencies}) => {
  const getDisplayValue = function getDisplayValue(givenValue, givenSetOnce) {
    if (givenSetOnce) {
      return givenValue;
    }
    return '';
  };
  const displayValue = getDisplayValue(price.value, price.dirty);

  const handleOnChange = function handleOnChange(event, newValue) {
    securityTextFieldChange(index, 'price', newValue);
  };

  const getConvertedIndicator = function getConvertedIndicator(givenPriceCurrency, givenCurrencies) {
    if (givenPriceCurrency === givenCurrencies.tradingCurrency) {
      return null;
    }
    return (<div>
      <EditorMoneyOff
data-tip
                data-for={'tooltipSecurityConverted' + index}
                className={cx('price-progress')} />
      <ReactTooltip
                            id={'tooltipSecurityConverted' + index}>
        <span>
                  Price converted from {price.currency} to {givenCurrencies.tradingCurrency} at a {currencies.listOfDistinctCurrencies[price.currency]} exchange rate
                </span>
      </ReactTooltip>
    </div>);
  };
  const convertedIndicator = getConvertedIndicator(price.currency, currencies);

  return (
    <div className={cx('price-text-field')}>
      <TextField
      id={'priceTextField' + index}

               value={displayValue}
               errorText={priceSelect.errorText}
               onChange={handleOnChange}
               hintText={priceSelect.hintText}
               errorStyle={{ float: 'left' }}
                />
      <PriceProgress
                   index={index}
                   fetchStatus={price.fetchStatus}
                   onClick={fetchPrice} />
      {convertedIndicator}
    </div>
  );
};

PriceCell.propTypes = {
  index: PropTypes.number.isRequired,
  price: PropTypes.object.isRequired,
  priceSelect: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  fetchPrice: PropTypes.func.isRequired,
};

export default PriceCell;
