import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
  
    // Filtering
    const excludeFields = ['search', 'sortOrder', 'sortBy','limit', 'page', 'fields'];
  
    // Remove excluded fields
    excludeFields.forEach((el) => delete queryObj[el]);
  
    // If 'filter' is passed as author ID, filter blogs by author._id
    if (queryObj.filter) {
      queryObj['author._id'] = queryObj.filter;
      delete queryObj.filter; // Remove the 'filter' field from the query
    }
  
    // Apply the filter query to the model
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  
    return this;
  }
  
  sort() {
    const sortBy = (this?.query?.sortBy as string)?.split(',')?.join(' ') || 'createdAt'; // Default to 'createdAt'
    const sortOrder = this?.query?.sortOrder || 'desc'; // Default to 'desc'
    const sortQuery = sortOrder === 'desc' ? `-${sortBy}` : sortBy; // Add '-' for descending order

    this.modelQuery = this.modelQuery.sort(sortQuery);
    return this;
  }
  
  

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;


    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;