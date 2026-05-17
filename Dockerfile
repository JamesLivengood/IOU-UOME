FROM ruby:2.7-slim

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    curl \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Ruby dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle config set without 'development test' \
    && bundle install

# Install JS dependencies (no postinstall webpack run)
COPY package.json ./
RUN npm install

# Copy application source
COPY . .

# Build frontend bundle
RUN npm run build

# Precompile Rails assets
RUN RAILS_ENV=production SECRET_KEY_BASE=placeholder bundle exec rake assets:precompile --trace

ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true

EXPOSE 3000

CMD bash -c "bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}"
