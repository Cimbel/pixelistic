import React, { Component } from 'react';
import { Input, ClickAwayListener, InputAdornment} from '@material-ui/core';
import { Place } from '@material-ui/icons';
import httpService from '../../../../api/http-service';
import PropTypes from 'prop-types';

export class LocationAutocomplete extends Component{
  constructor(props){
    super(props);
    this.state = {    
      features: [],
      suggestionOpen: false,
      searchText: '',
      currentIndex: -1
    }
  }

  render(){
    let variants;
    if(this.state.features.length){
      variants = this.state.features.map( (item, i) => {
      return <div 
        className= {`search-loc ${i === this.state.currentIndex ? 'selected' : ''}`}
        key={i} 
        id={i}
        onClick={this.selectPlace}
        onMouseEnter = {this.changeIndex}> 
        {item.place_name_en} 
      </div>
      });
    }
  
  return <div className="location-autocomplete">
      <div className="field">
        <Input 
          startAdornment={<InputAdornment position="start"> <Place/></InputAdornment>}
          onChange={this.handleInput} onKeyDown={this.arrowNavigate} className="input" value={this.state.searchText} placeholder="Location"
        />
      </div>
      
      <div className="autocomplete">
        <ClickAwayListener onClickAway={this.closeSuggestion}>
          <div className="variants">
            {this.state.suggestionOpen ? variants : null }
          </div>
        </ClickAwayListener>
      </div>
  </div>
  }

  handleInput = (e) => {
    const text = e.target.value;
    if(text.length > 2){
      this.getPlaces(text);
      this.setState({ searchText: text });
    } else {
      this.setState({ searchText: text, suggestionOpen: false });
    }

    this.props.onSelectLocation('');
  }

  selectPlace = (e) => {
    this.props.onSelectLocation(e.target.innerHTML);
    this.setState({ searchText: e.target.innerHTML, suggestionOpen: false });
  }

  getPlaces = (search) => {
    const query = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoiamVzdGVybWF4cmtvIiwiYSI6ImNqa2xoYnJhYTAwajMzcXFydjRkZGYyYXkifQ.GoGujrYQnsESbqfkfA9htg&autocomplete=true&language=en`;    
    httpService.get(query).then(
      res => {
        if (res.data.features) {
          this.setState( { features: res.data.features, suggestionOpen: true });
        } 
        return;
      }
    );
  }

  closeSuggestion = () => {
    this.setState({ suggestionOpen: false });
  }
  
  changeIndex = (e) => {
    this.setState({ currentIndex: Number(e.target.id) });
  }

  arrowNavigate = (e) => {
    if(this.state.suggestionOpen){
      let index = this.state.currentIndex;
      switch(e.which){
        case 40:
          e.preventDefault(); 
          index++; 
          break;
        case 38: 
          e.preventDefault();
          index--; 
          break;
        case 13: 
          const newSearch = this.state.features[index].place_name_en;
          this.props.onSelectLocation(newSearch);
          this.setState({ searchText: newSearch, suggestionOpen: false });
          break;
        case 27:
          this.closeSuggestion();
          break;
        default: break;
      }

      if(index < 0) index = 0;
      if(index > this.state.features.length - 1) index = this.state.features.length - 1;

      this.setState({ currentIndex: index });
    }
  }
}

LocationAutocomplete.propTypes = {
  onSelectLocation: PropTypes.func.isRequired
};

export default LocationAutocomplete;
