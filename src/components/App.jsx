import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import s from './Styles.module.css';
import { searchImagesbyQuery } from '../services/api';
import { Modal } from './Modal';
import { Loader } from './Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalurl, setModalurl] = useState('');

  useEffect(() => {
    async function loadImagesbyQuery() {
      try {
        setLoading(true);
        const someImages = await searchImagesbyQuery(search, page);

        if (page === 1) {
          setImages(someImages.hits);
        } else {
          setImages(prev => [...prev, ...someImages.hits]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadImagesbyQuery();
  }, [search, page]);

  const onSearchQuery = e => {
    setSearch(e);
    setPage(1);
    // setImages([]);
  };

  const openModal = url => {
    setModal(prev => !prev);
    setModalurl(url);
  };

  const closeModal = () => {
    setModal(false);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  let aLotOfImage = false;
  if (images && images.length >= 12) aLotOfImage = true;
  console.log(modal, modalurl);
  console.log(images);
  return (
    <div className={s.App}>
      <Searchbar onSearch={onSearchQuery} />
      {loading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {!images.length && !loading && (
        <h2 className={s.Notify}>Sorry! Nothing found! Try again, please!</h2>
      )}
      {modal && <Modal modalurl={modalurl} closeModal={closeModal} />}
      {aLotOfImage && <Button addMoreImages={onLoadMore} />}
    </div>
  );
};
