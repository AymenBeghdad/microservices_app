VAGRANT_API_VERSION = "2"

Vagrant.configure(VAGRANT_API_VERSION) do |config|
  # Define the base box for all VMs
  config.vm.box = "ubuntu/bionic64" # Ubuntu 18.04 LTS

  # User Service VM
  config.vm.define "userservice" do |user|
    user.vm.hostname = "userservice"
    user.vm.network "private_network", ip: "192.168.56.101"
    user.vm.provider "virtualbox" do |vb|
      vb.name = "UserServiceVM"
      vb.memory = 512
      vb.cpus = 1
    end
    user.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y nodejs npm mysql-server
      npm install -g nodemon
    SHELL
  end

  # Product Service VM
  config.vm.define "productservice" do |product|
    product.vm.hostname = "productservice"
    product.vm.network "private_network", ip: "192.168.56.102"
    product.vm.provider "virtualbox" do |vb|
      vb.name = "ProductServiceVM"
      vb.memory = 512
      vb.cpus = 1
    end
    product.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y nodejs npm mysql-server
      npm install -g nodemon
    SHELL
  end

  # Order Service VM
  config.vm.define "orderservice" do |order|
    order.vm.hostname = "orderservice"
    order.vm.network "private_network", ip: "192.168.56.103"
    order.vm.provider "virtualbox" do |vb|
      vb.name = "OrderServiceVM"
      vb.memory = 512
      vb.cpus = 1
    end
    order.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y nodejs npm mysql-server
      npm install -g nodemon
    SHELL
  end
end
