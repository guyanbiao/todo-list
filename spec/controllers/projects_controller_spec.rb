require 'rails_helper'
describe Api::ProjectsController , :type => :controller do
  before {
    user = FactoryGirl.create(:user)
    sign_in user
  }
  describe "GET /api/projects" do
    it "should get default project" do
      get :index
      expect(JSON.parse(response.body).map {|x| x["title"]}).to include "示例项目"
      expect(response.status).to eq(200)
    end
  end

  describe ":create" do
    it "should create project" do
      post :create, title: "jobs"
      expect(response.body).to include("jobs")
    end
  end

  describe ":destroy" do
    it "should delete project" do
      orign_count = Project.count
      post :destroy, id: Project.last.id
      expect(Project.count).to equal(orign_count - 1)
    end
  end
end
