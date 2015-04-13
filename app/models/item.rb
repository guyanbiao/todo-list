class Item
  include Mongoid::Document
  belongs_to :Project
end
