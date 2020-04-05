pragma solidity ^0.5.0;



import "./Token.sol";


contract TimelockFactory {

       
    TimelockToken[] public deployedCampaigns;
                            
    function createCampaign(Token _token, string memory _nameCampaign, address _beneficiary, uint256 _releaseTime, uint256 _maxamount) public {
        TimelockToken newCampaign = new TimelockToken(_token, _nameCampaign, _beneficiary, _releaseTime, _maxamount, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (TimelockToken[] memory) {
        return deployedCampaigns;
    }
}

contract TimelockToken {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    

  Request[] public requests;
  Token public token;
  string public nameCampaign;
  address public beneficiary;
  uint256 public releaseTime;
  uint256 public maxamount;
  address public creater;

  constructor(
    Token _token,
    string memory _nameCampaign,
    address _beneficiary,
    uint256 _releaseTime,
    uint256 _maxamount,
    address _creater
  )
    public
  {
    require(_releaseTime > block.timestamp);
    require(_maxamount > 0);
    token = _token;
    nameCampaign = _nameCampaign;
    beneficiary = _beneficiary;
    releaseTime = _releaseTime;
    maxamount = _maxamount;
    creater = _creater;
    
  }
    


  function release() public {
    require(block.timestamp >= releaseTime);

    uint256 amount = token.balanceOf(address(this));
    require(amount > 0);

    token.transfer(beneficiary, amount);
  }
  
    function releaseAmount(uint256 value) public {
    uint256 amount = token.balanceOf(address(this));
    require(amount > 0);
    require(value < maxamount);

    token.transfer(beneficiary, value);
  }
  
  
    function createRequest(string memory description, uint value, address recipient) public  {
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false
            });
            
            requests.push(newRequest);
        }

    function finalizeRequest(uint index) public restricted {
            Request storage request = requests[index];
            
            require(!request.complete);
            address recipientRequest = request.recipient;
            
            token.transfer(recipientRequest,request.value);
            request.complete = true;
            
            
            //request.recipient.transfer(request.value);
    }
    
    //manager can call
    modifier restricted() {
        require(msg.sender == creater);
        _;
    }
}