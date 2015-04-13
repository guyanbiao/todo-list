Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  namespace :api do
    resources :projects, only: [:create, :index] do
      resources :items, only: [:index]
    end
  end
end
