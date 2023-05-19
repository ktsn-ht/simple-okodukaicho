Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  get    'login'           => 'sessions#new'
  post   'login'           => 'sessions#create'
  delete 'logout'          => 'sessions#destroy'

  post   'users'           => 'users#create'
  put    'users'           => 'users#update'

  get    'income-expenses' => 'income_expenses#index'
  post   'income-expenses' => 'income_expenses#create'
end
