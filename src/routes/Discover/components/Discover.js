import React, { Component } from 'react';
import makeRequest from '../api/makeRequest'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  
  async componentDidMount() {

    const newReleases = await makeRequest('new-releases');
    const playlists = await makeRequest('featured-playlists');
    const categories = await makeRequest('categories');

    const {items:releases_} = newReleases.data.albums;
    const {items:playlists_} = playlists.data.playlists;
    const {items:categories_} = categories.data.categories;

    const data = {...this.state};
    data.categories = categories_;
    data.playlists = playlists_;
    data.newReleases = releases_;

    this.setState(data);
  }
  render() {
    const { newReleases, playlists, categories } = this.state;
    console.log(this.state);
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
