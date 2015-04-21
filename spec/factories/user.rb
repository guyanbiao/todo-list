FactoryGirl.define do
  factory :user do
    email "neal@abc.com"
    password 'password'
    password_confirmation 'password'
  end
end
