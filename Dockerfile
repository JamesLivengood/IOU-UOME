FROM ruby:2.7

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

RUN npm install --legacy-peer-deps
RUN bundle exec rake assets:precompile

CMD bash -c "bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"
