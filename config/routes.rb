Rails.application.routes.draw do


  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy, :show]
    resources :bill, only: [:create]
    get 'users/search', :to => 'users#search'
  end

  root "static_pages#root"
end
