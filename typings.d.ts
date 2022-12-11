type Reply = {
    email: string;
    reply: string;
  };
  interface Comment {
    _id: string;
    comment: string;
    email: string;
    slug: string;
    createdAt: string;
    replies: Reply[];
    likes: string[];
    matchResults: (comment: string) => Comment[];
    _v: number;
  }

  interface Response {
    _id: string;
    title: string;
    author: string;
    desc: string;
    slug: string;
    imgs: string[];
    createdAt: string;
    __v: number;
  }
  