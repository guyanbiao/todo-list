require 'rails_helper'
describe Api::ItemsController, type: :controller do
  before {
    user = FactoryGirl.create(:user)
    sign_in user
  }

  describe "GET /projects/project_id/items" do
    it "should get  project's  items" do
      get :index, project_id: Project.last.id
      expect(response.status).to eq(200)
    end
  end

  describe "POST /projects/project_id/items" do
    it "should get  project's  items" do
      post :create, project_id: Project.last.id, content: "go to sport"
      expect(response.body).to include("go to sport")
    end
  end

  describe "POST /items/:id/toggle" do
    it "should toggle state" do
      item = Item.first
      item.update_attribute :finished, false
      post :toggle, item_id: item.id
      expect(Item.find(item.id).finished).to eq(true)
    end

  end
end
