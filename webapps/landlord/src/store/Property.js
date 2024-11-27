import { action, computed, flow, makeObservable, observable } from 'mobx';
import { apiFetcher } from '../utils/fetch';
import { updateItems } from './utils';

export default class Property {
  constructor() {
    this.selected = {};
    this.filters = { searchText: '', status: ['vacant'] };
    this.items = [];

    makeObservable(this, {
      selected: observable,
      filters: observable,
      items: observable,
      filteredItems: computed,
      setSelected: action,
      setFilters: action,
      fetch: flow,
      fetchOne: flow,
      create: flow,
      update: flow,
      delete: flow,
      createWarranty: flow,
      updateWarranty: flow,
      deleteWarranty: flow,
    });
  }

  get filteredItems() {
    let filteredItems = this.items;
    if (this.filters.status?.length) {
      const typeFilters = this.filters.status.filter(
        (status) => !['vacant', 'occupied'].includes(status)
      );
      if (typeFilters.length) {
        filteredItems = filteredItems.filter(({ type }) =>
          typeFilters.includes(type)
        );
      }

      const statusFilters = this.filters.status.filter((status) =>
        ['vacant', 'occupied'].includes(status)
      );
      if (statusFilters.length) {
        filteredItems = filteredItems.filter(({ status }) =>
          statusFilters.includes(status)
        );
      }
    }

    if (this.filters.searchText) {
      const regExp = /\s|\.|-/gi;
      const cleanedSearchText = this.filters.searchText
        .toLowerCase()
        .replace(regExp, '');

      filteredItems = filteredItems.filter(
        ({ name }) =>
          name.replace(regExp, '').toLowerCase().indexOf(cleanedSearchText) !=
          -1
      );
    }
    return filteredItems;
  }

  setSelected = (property) => (this.selected = property);

  setFilters = ({ searchText = '', status = [] }) =>
    (this.filters = { searchText, status });

  *fetch() {
    try {
      const response = yield apiFetcher().get('/properties');

      this.items = response.data;
      if (this.selected?._id) {
        this.setSelected(
          this.items.find((item) => item._id === this.selected._id) || {}
        );
      }
      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *fetchOne(propertyId) {
    try {
      const response = yield apiFetcher().get(`/properties/${propertyId}`);
      const updatedProperty = response.data;
      this.items = updateItems(updatedProperty, this.items);
      if (this.selected?._id === updatedProperty._id) {
        this.selected = updatedProperty;
      }
      return { status: 200, data: response.data };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *create(property) {
    try {
      const response = yield apiFetcher().post('/properties', property);
      const createdProperty = response.data;
      this.items = updateItems(createdProperty, this.items);

      return { status: 200, data: createdProperty };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *update(property) {
    try {
      const response = yield apiFetcher().patch(
        `/properties/${property._id}`,
        property
      );
      const updatedProperty = response.data;
      this.items = updateItems(updatedProperty, this.items);
      if (this.selected?._id === updatedProperty._id) {
        this.setSelected(updatedProperty);
      }
      return { status: 200, data: updatedProperty };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *delete(ids) {
    try {
      yield apiFetcher().delete(`/properties/${ids.join(',')}`);
      return { status: 200 };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *createWarranty(propertyId, warranty) {
    try {
      console.log('API call to create warranty for property ID:', propertyId);
      console.log('Warranty data:', warranty);

      const response = yield apiFetcher().post(
        `/properties/${propertyId}/warranties`,
        warranty
      );
      const updatedProperty = response.data;
      this.items = updateItems(updatedProperty, this.items);
      if (this.selected?._id === updatedProperty._id) {
        this.setSelected(updatedProperty);
      }
      return { status: 200, data: updatedProperty };
    } catch (error) {
      console.error('Error creating warranty:', error);
      return { status: error?.response?.status };
    }
  }

  *updateWarranty(propertyId, warrantyId, warranty) {
    try {
      const response = yield apiFetcher().patch(
        `/properties/${propertyId}/warranties/${warrantyId}`,
        warranty
      );
      const updatedProperty = response.data;
      this.items = updateItems(updatedProperty, this.items);

      return { status: 200, data: updatedProperty };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }

  *deleteWarranty(propertyId, warrantyId) {
    try {
      const response = yield apiFetcher().delete(
        `/properties/${propertyId}/warranties/${warrantyId}`
      );
      const updatedProperty = response.data;
      this.items = updateItems(updatedProperty, this.items);

      return { status: 200, data: updatedProperty };
    } catch (error) {
      return { status: error?.response?.status };
    }
  }
}