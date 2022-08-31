Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
      resources :quotes, only: %i[show create]
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'

end
