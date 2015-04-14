class Item
  include Mongoid::Document
  belongs_to :Project
  validates_presence_of :content
  field :content, type: String
  field :finished, type: Boolean, default: false

  def self.data
    Proc.new {|x|
      {id: x.id.to_s, content: x.content, finished: x.finished}
    }
  end
end
