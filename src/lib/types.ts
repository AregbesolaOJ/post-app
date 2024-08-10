const resources = ['posts', 'users', 'comments'] as const;

export type SectionName = (typeof resources)[number];

export type FetcherProps = {
  /**
   * `urlPath`: the allowed resources to be fetched from the base url, one of: "/posts", "/users", "/comments"
   *
   * @see {@link https://jsonplaceholder.typicode.com}
   */
  urlPath: `/${SectionName}`;

  /**
   * `skip`: a boolean value specifying whether to initiate the request or not
   */
  skip?: boolean;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
