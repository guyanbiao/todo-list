class Project 
  include Mongoid::Document
  has_many :items
  belongs_to :user
  validates_presence_of :title
  field :title, type: String
end
