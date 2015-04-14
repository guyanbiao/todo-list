Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  namespace :api do
    post "items/:item_id/toggle" => "items#toggle"
    resources :projects, only: [:create, :index] do
      resources :items, only: [:index, :create]
    end
  end
end
