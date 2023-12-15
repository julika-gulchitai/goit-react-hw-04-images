import { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import s from './Styles.module.css';

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const onClickSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  const onChangeQuery = e => {
    setQuery(e.target.value);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onClickSubmit}>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeQuery}
        />
        <span className={s.SearchFormButtonLabel}></span>
        <button type="submit" className={s.SearchFormButton}>
          <BsSearchHeart color="#617587" size="30" />
        </button>
      </form>
    </header>
  );
};
